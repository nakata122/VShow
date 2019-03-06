const Users = require('../models/UserSchema');
const Expositions = require('../models/ExpositionSchema');
const Top = require('../models/TopSchema');
const cloudinary = require('cloudinary');

module.exports = {
    post(req, res) {
        if(req.user){
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
    getDelete(req, res) {
        if(req.user){

            let expos = req.user.expositions.map(String);
            if(expos.includes(req.params.id) || req.user.roles === 'admin'){
                Expositions.deleteOne({_id: req.params.id}).then(() => {
                    res.json({type: 'info', message: 'Deleted successfully!'});
                }).catch(err => {
                    res.json({type: 'error', message: 'Not found'});
                });
            }
        } 
    },
    getImageDelete(req, res) {
        if(req.user){
            let expos = req.user.expositions.map(String);
            if(expos.includes(req.params.expoId)){
                Expositions.findById(req.params.expoId, (err, expo) => {
                    expo.images.splice(req.params.imgId, 1);
                    expo.save();
                    res.json({type: 'info', message: 'Successfully updated.'});
                }).catch(err => {
                    res.json({type: 'error', message: 'Not found'});
                });
            }
        } 
    },
    getUser(req,res) {
        if(req.user){
            
            let expos = req.user.expositions;
            let result = [];
            Expositions.find({_id: expos}).then(expo => {
                for(let i=0;i<expo.length;i++){
                    result.push({id: expo[i].id, mainImage: expo[i].mainImage});
                }
                res.json({expositions: result});
            }).catch(err => {
                res.json({type: 'error', message: 'Not found'});
            });
        }
        else res.status(401).send('Not authorized');
    },
    getAll(req,res) {
        let result = [];
        Expositions.find({}).limit(Number(req.params.max)).exec((err, expo) => {
            for(let i=0;i<expo.length;i++){
                result.push({id: expo[i].id, mainImage: expo[i].mainImage, title: expo[i].title});
            }
            res.json({expositions: result});
        }).catch(err => {
            res.json({type: 'error', message: 'Not found'});
        });
    },
    getTop(req,res) {
        Top.find({}).limit(10).then(tops => {
            let result = [];

            let ids = [];
            tops.forEach(top => {ids.push(top.id)});

            Expositions.find({_id: ids}).limit(10).then(expo => {
                for(let i=0;i<expo.length;i++){
                    result.push({id: expo[i].id, mainImage: expo[i].mainImage});
                }
                res.json({expositions: result});
            }).catch(err => {
                res.json({type: 'error', message: 'Not found'});
            });
        }).catch(err => {
            res.json({type: 'error', message: 'Not found'});
        });
    },
    postTop(req,res) {
        Top.create({id: req.body.id}).then(() => {
            res.json({type: "info", message: "Added to top successfully"});
        }).catch(err => {
            res.json({type: 'error', message: 'Not found'});
        });
    },
    getDetail(req,res) {
        Expositions.findById(req.params.id).then(data => {
            res.json({data});
        }).catch(err => {
            res.json({type: 'error', message: 'Not found'});
        });
    },
    getSearch(req,res) {
        Expositions.find(
            { "title": { "$regex": req.params.name, "$options": "i" } },
            function(err,data) { 
                res.json({data});
            } 
        ).catch(err => {
            res.json({type: 'error', message: 'Not found'});
        });
    },
    postSave(req,res) {
        if(req.user && req.params.id){
            Expositions.findById(req.params.id).then(expo => {
                if(req.body.imgSrc !== null)
                    expo.images[req.body.frameId] = {src: req.body.imgSrc, imgId: req.body.imgId, matrix: req.body.matrix};
                else{
                    let url = expo.images[req.body.frameId].src;
                    let id = expo.images[req.body.frameId].imgId;
                    expo.images[req.body.frameId] = {src: url, imgId: id, matrix: req.body.matrix};
                }
                expo.markModified('images');
                expo.save();
                res.json({type: 'info', message: 'Successfully updated.'});
            }).catch(err => {
                res.json({type: 'error', message: 'Not found'});
            });
        }
    }
};