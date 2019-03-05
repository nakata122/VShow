const Users = require('../models/UserSchema');
const Images = require('../models/ImageSchema');
const cloudinary = require('cloudinary');

module.exports = {
    post(req, res) {
        if(req.user){

            //Upload image to cludinary
            cloudinary.v2.uploader.upload_stream({resource_type: 'image', folder: 'vshow', use_filename: false}, function(error, result) {
                    console.log(error);
                    console.log(result);

                    //Upload image and data to mongodb
                    Images.create({
                        title: result.public_id.split('/')[1],
                        author: req.user._id,
                        id: result.public_id + '.' + result.format
                    }).then(img => {
                        console.log(img);
                        //Add image to the user list
                        Users.findById(req.user._id).then(user => {
                            user.images.push(img._id);
                            user.save();
                            res.json({id: img._id});
                        });

                    }).catch((error) => {
                        console.log(error);
                        res.json({type: 'error', message: 'Could not upload image.'});
                    });
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
                    result.push({src: img[i].id, title: img[i].title});
                    ids.push(img[i]._id);
                }
                res.json({images: result, ids});
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
        });
    },
    getDetail(req,res) {
        if(req.user){
            Images.findById(req.params.id).then(data => {
                res.json({data});
            });
        }
        else res.status(401).send('Not authorized');
    },
    put(req,res) {
        if(req.user){
            Images.findById(req.body._id, (err, img) => {
                img.title = req.body.title;
                img.price = req.body.price;
                img.currency = req.body.currency;
                img.genre = req.body.genre;
                img.year = req.body.year;
                img.status = req.body.status;
                img.description = req.body.description;
                img.save();
                res.json({type: 'info', message: 'Successfully updated.'});
            });
        }
        else res.status(401).send('Not authorized');
    }
};