const Users = require('../models/UserSchema');
const Items = require('../models/ItemSchema');

module.exports = {
    get(req, res) {
        if(req.user){
            Items.findById(req.params.id, (err, item) => {
                if(err)
                    res.json({data: []});
                else
                    res.json({data: item});
            })
        } else res.status(401).send('Not authorized');
    },
    getRandom(req, res) {
        if(req.user){
            Items.find({}).then((items) => {
                let random = Math.floor(Math.random() * items.length);
                Users.findById(req.user._id, (err, user) => {
                    if(items[random]) {
                        user.inventory.push(items[random]._id);
                        user.save();
                        res.json({type: 'info', message: 'Item added.'});
                    } else res.json({type: 'error', message: 'No items found.'});
                })
            })
        } else res.status(401).send('Not authorized');
    },
    put(req, res) {
        if(req.user){
            if (req.user.roles.includes('admin')) {
                Items.findById(req.params.id, (err, item) => {
                    let edit = req.body;
                    item.name = edit.name;
                    item.imageUrl = edit.imageUrl;
                    item.type = edit.type;
                    item.minLvl = edit.minLvl;
                    item.description = edit.description;
                    item.save();
                }).then(() => {
                    res.json({type: 'info', message: 'Item edited.'});
                }).catch(() => {
                    res.json({type: 'error', message: 'Could not add item.'});
                })
            } else res.status(401).send('Not authorized');
        }
        else res.status(401).send('Not authorized');
    },
    post(req, res) {
        let item = req.body;
        if(req.user){
            if (req.user.roles.includes('admin')) {
                Items.create({
                    name: item.name,
                    imageUrl: item.imageUrl,
                    type: item.type,
                    minLvl: item.minLvl,
                    description: item.description
                }).then(() => {
                    res.json({type: 'info', message: 'Item added.'});
                }).catch(() => {
                    res.json({type: 'error', message: 'Could not update item.'});
                })
            } else res.status(401).send('Not authorized');
        }
        else res.status(401).send('Not authorized');
    },
    remove(req, res) {
        if(req.user) {
            if (req.user.roles.includes('admin')) {
                Items.deleteOne({_id: req.params.id})
                    .then(() => {
                        Users.find({}).then(users => {
                            users.forEach(user => {
                                if(user.inventory) {
                                    user.inventory = user.inventory.filter(item => {
                                        return item !== req.params.id;
                                    });
                                    user.save();
                                }
                            })
                        });
                        res.json({type: 'info', message: 'Item deleted.'});
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({type: 'error', message: 'Cannot delete this item.'});
                    })
            } else
                res.status(401).send('Not authorized');
        } else
            res.status(401).send('Not authorized');
    },
};