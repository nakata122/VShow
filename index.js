const express = require('express');
const server = require('./config/server');
const routes = require('./config/routes');
const encryption = require('./infrastructure/encryption');
const User = require('./models/UserSchema');
const app = express();
const port = 3001;
const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require("multer-storage-cloudinary");

server(app);

routes(app);

require('./config/db');

cloudinary.config({ 
    cloud_name: 'dvn7y9omc', 
    api_key: '713462596168557', 
    api_secret: 'VI1LQKFA4YCxdh2k8Oyspi0S_50' 
});

// let storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "demo",
//     allowedFormats: ["jpg", "png"],
//     filename: function (req, file, cb) {
//         cb(undefined, 'my-file-name');
//     }
// });


//.then(() => {
//     let salt = encryption.generateSalt();
//     let hashedPassword = encryption.generateHashedPassword(salt, '123');

//     User.create({
//         username: 'admin',
//         money: -1,
//         roles: 'admin',
//         salt: salt,
//         expositions: [],
//         hashedPass: hashedPassword
//     });
// });
require('./config/passport')();
app.listen(process.env.PORT || port, () => console.log('App listening on ' + port));

