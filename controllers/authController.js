const router = require('express').Router();
const passport = require('passport');

const encryption = require('../infrastructure/encryption');
const User = require('../models/UserSchema');

const postUserRegister = (req, res) => {
    let reqUser = req.body;
    // Add validations!
    if(reqUser.password.length < 3)
        res.json({type:'error', message: 'Паролата трябва да е над 3 символа'});
    if(reqUser.username.length > 15)
        res.json({type:'error', message: "Потребителското име не може да е над 15 символа"});
    else {
        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password);

        User.create({
            username: reqUser.username,
            salt: salt,
            hashedPass: hashedPassword
        }).then(user => {
            console.log('registered');
            req.logIn(user, (err, user) => {
                res.json({type:'info', message: 'Успешна регистация.', username: req.user.username});
            })
        }).catch(err => {
            console.log('Error');
            res.json({type:'error', message: 'Потребителското име е заето.'});
        })
    }
};

const postUserLogin = (req, res) => {
    res.json({type:'info', message: 'Успешно влизане.', username: req.user.username});
};
const getRoles = (req, res) => {
    if(!req.user)
        res.status(401).send('Not authorized');
    else
        res.json({roles: req.user.roles, money: req.user.money, expositions: req.user.expositions, images: req.user.images});
};
const getUserLogout = (req, res) => {
    req.logout();
    res.json({type: 'info', message: 'Успешно излизане.'});
};
const getUser = (req, res) => {
    if(req.user)
        res.json({username: req.user.username, roles: req.user.roles, expositions: req.user.expositions, images: req.user.images});
    else
        res.json({});
};


router
    .post('/login', passport.authenticate('local'), postUserLogin)
    .get('/logout', getUserLogout)
    .post('/register', postUserRegister)
    .get('/roles', getRoles)
    .get('/user', getUser);

module.exports = router;
