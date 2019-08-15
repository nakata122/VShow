const Users = require('../models/UserSchema');
const Images = require('../models/ImageSchema');
const cloudinary = require('cloudinary');

module.exports = {
    post(req, res) {
        if(req.user && req.user.images.length < 10){

            //Upload image to cludinary
            cloudinary.v2.uploader.upload_stream({resource_type: 'image', folder: 'vshow', use_filename: false}, function(error, result) {
                    console.log(error);
                    console.log(result);

                    if(result) {
                    //Upload image and data to mongodb
                    Images.create({
                        title: result.public_id.split('/')[1],
                        author: req.user._id,
                        id: result.public_id + '.' + result.format
                    }).then(img => {
                        //Add image to the user list
                        Users.findById(req.user._id).then(user => {
                            user.images.push(img._id);
                            user.save();
                            res.json({id: img._id});
                        });

                    }).catch((error) => {
                        res.json({type: 'error', message: 'Грешка. Изображението не е качено.'});
                    });
                    }
                })
                .end(req.file.buffer)
        }
        else res.status(401).send('Not authorized');
    },
    getUser(req,res) {
        if(req.user){
            
            let images = req.user.images;
            let result = [], ids = [];
            Images.find({_id: images}).then(img => {
                for(let i=0;i<img.length;i++){
                    result.push({src: img[i].id, title: img[i].title, id: img[i]._id});
                    ids.push(img[i]._id);
                }
                res.json({images: result, ids});
            }).catch(err => {
                res.json({type: 'error', message: 'Изображението не съществува'});
            });
        }
        else res.status(401).send('Not authorized');
    },
    getAll(req,res) {
        let result = [], ids = [];
        Images.find({}).then(img => {
            for(let i=0;i<img.length;i++){
                result.push({src: img[i].id, title: img[i].title});
                ids.push(img[i]._id);
            }
            res.json({images: result, ids});
        }).catch(err => {
            res.json({type: 'error', message: 'Изображението не съществува'});
        });
    },
    getDelete(req,res) {
        if(req.user){
            let images = req.user.images.map(String);
            console.log(req.params);
            if(images.includes(req.params.id) || req.user.roles === 'admin'){
                Images.deleteOne({_id: req.params.id}).then(() => {
                    res.json({type: 'info', message: 'Успешно изтрито!'});
                }).catch(err => {
                    res.json({type: 'error', message: 'Изображението не съществува'});
                });
            }
        } 
        else res.status(401).send('Not authorized');
    },
    getDetail(req,res) {
            Images.findById(req.params.id).then(data => {
                res.json({data});
            }).catch(err => {
                res.json({type: 'error', message: 'Изображението не съществува'});
            });
    },
    put(req,res) {
        if(req.user){
            console.log(req.body);
            Images.findById(req.body._id, (err, img) => {
                    img.title = req.body.title;
                    img.price = req.body.price;
                    img.currency = req.body.currency;
                    img.genre = req.body.genre;
                    img.year = req.body.year;
                    img.status = req.body.status;
                    img.description = req.body.description;
                    img.save();
                    res.json({type: 'info', message: 'Успешно редактирано.'});
            }).catch(err => {
                res.json({type: 'error', message: 'Изображението не съществува'});
            });
        }
        else res.status(401).send('Not authorized');
    }
};