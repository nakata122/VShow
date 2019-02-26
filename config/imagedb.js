const cloudinary = require('cloudinary');
const multer = require('multer');

module.exports = () => {
    cloudinary.config({ 
        cloud_name: 'dvn7y9omc', 
        api_key: '713462596168557', 
        api_secret: 'VI1LQKFA4YCxdh2k8Oyspi0S_50' 
    });

    let storage = cloudinaryStorage({
        cloudinary: cloudinary,
        folder: "demo",
        allowedFormats: ["jpg", "png"],
        filename: function (req, file, cb) {
            cb(undefined, 'my-file-name');
        }
    });
}