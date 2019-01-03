const Auction = require('../models/AuctionSchema');
const Items = require('../models/ItemSchema');
const Users = require('../models/UserSchema');
const url = require('url');

module.exports = {
    get(req, res) {
        Auction.find({}).then(auctions => {
            res.json({auctions: auctions, time: new Date});
        });
    },
    post(req, res) {
        let reqAuc = req.body;
        if(req.user) {
            if(!req.user.hasAuction) {
                req.user.hasAuction = true;
                req.user.save();
                Items.findById(reqAuc.item, (err, itemData) => {
                        Auction.create({
                            item: itemData,
                            author: req.user._id,
                            highestBid: {userId: req.user._id, bid: reqAuc.price},
                            startsAt: Date.now(),
                            endsAt: Date.now() + 1000 * 20  //Add 20 seconds
                        }).then(auc => {
                            setTimeout(() => {
                                Auction.findById(auc._id).then(auction => {
                                    let bidder = auction.highestBid.userId.toString();
                                    let author = auction.author.toString();
                                    if (bidder !== author) {
                                        console.log(auction.highestBid.userId);
                                        console.log(auction.author);
                                        Users.findById(auction.highestBid.userId).then(user => {
                                            user.money -= Number(auction.highestBid.bid);
                                            user.inventory.push(auction.item._id);
                                            user.save();
                                        });
                                        Users.findById(auction.author).then(user => {
                                            user.money += Number(auction.highestBid.bid);
                                            let index = user.inventory.indexOf(auction.item._id);
                                            if (index !== -1) {
                                                user.inventory.splice(index, 1);
                                            }
                                            user.hasAuction = false;
                                            user.save();
                                        });
                                    } else {
                                        Users.findById(auction.author).then(user => {
                                            user.hasAuction = false;
                                            user.save();
                                        });
                                    }
                                    Auction.deleteOne({_id: auction._id}).then(() => {
                                        console.log('Auction finished');
                                    })
                                })


                            }, 1000 * 20);
                            res.json({type: 'info', message: 'Auction created.'});
                        }).catch(err => {
                            console.log(err);
                            res.json({type: 'error', message: 'Could not sell item.'});
                        })
                })
            } else
                res.json({type: 'error', message: 'You already have an auction.'});
        } else
            res.status(401).send('Not authorized');
    },
    bid(req, res){
        let reqAuc = req.body;
        if(req.user) {
            Auction.findById(req.params.id).then(auc => {
                if (Number(auc.highestBid.bid) < Number(reqAuc.bid) && Number(req.user.money) >= Number(reqAuc.bid)) {
                    auc.highestBid.bid = reqAuc.bid;
                    auc.highestBid.userId = req.user._id;
                    auc.markModified('highestBid');
                    auc.save();

                    res.json({type: 'info', message: 'Bid successful.'});
                } else
                    res.json({type: 'info', message: 'Not enough money.'});

            }).catch(err => {
                res.json({type: 'error', message: 'Auction has ended'});
            })
        }
    }
};