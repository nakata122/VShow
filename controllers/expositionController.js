const Users = require('../models/UserSchema');
const Expositions = require('../models/ExpositionSchema');
const cloudinary = require('cloudinary');

module.exports = {
    post(req, res) {
        if(req.user){
            console.log(req.body);
                //Upload exposition and data to mongodb
                Expositions.create({
                    title: req.body.title,
                    author: req.user._id,
                    from: req.body.from,
                    to: req.body.to,
                    description: req.body.description,
                    mainImage: req.body.mainImage,
                    room: req.body.room
                }).then(expo => {
                    console.log(expo);
                    //Add exposition to the user list
                    Users.findById(req.user._id).then(user => {
                        user.expositions.push(expo._id);
                        user.save();
                        res.json({id: expo._id});
                    });

                }).catch((error) => {
                    console.log(error);
                    res.json({type: 'error', message: 'Could not create exposition.'});
                });
            }
        else res.status(401).send('Not authorized');
    },
    getAll(req,res) {
        if(req.user){
            
            let expos = req.user.expositions;
            let result = [];
            Expositions.find({_id: expos}).then(expo => {
                for(let i=0;i<expo.length;i++){
                    result.push({id: expo[i].id, mainImage: expo[i].mainImage});
                }
                res.json({expositions: result});
            });
        }
        else res.status(401).send('Not authorized');
    },
    getDetail(req,res) {
        Expositions.findById(req.params.id).then(data => {
            res.json({data});
        });
    },
    postSave(req,res) {
        if(req.user && req.params.id){
            Expositions.findById(req.params.id).then(expo => {
                if(req.body.imgSrc !== null && req.body.frameId <= expo.images.length)
                    expo.images[req.body.frameId] = {src: req.body.imgSrc, imgId: req.body.imgId, matrix: req.body.matrix};
                else{
                    let url = expo.images[req.body.frameId].src;
                    let id = expo.images[req.body.frameId].imgId;
                    expo.images[req.body.frameId] = {src: url, imgId: id, matrix: req.body.matrix};
                }
                expo.markModified('images');
                expo.save();
                res.json({type: 'info', message: 'Successfully updated.'});
            });
        }
    }
};