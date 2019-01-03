const mongoose = require('mongoose');
const encryption = require('../infrastructure/encryption');

const err = 'Wrong email or password';

let userSchema = new mongoose.Schema({
    username: { type: String, required: err, unique: true },
    hashedPass: { type: String, required: err },
    salt: String,
    roles: { type: Array, default: [] },
    money: { type: Number, default: 10 },
    expositions: {type: Array, default: []}
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.seedUsers = () => {
    User.find({}).then(users => {
        if (users.length > 0) return;

        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, '123456');

        User.create({
            username: 'Admin',
            salt: salt,
            hashedPass: hashedPass,
            roles: ['Admin']
        });

        console.log('Seed complete.');
    });
};
