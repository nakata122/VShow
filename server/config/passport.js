const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserSchema');

module.exports = () => {
    passport.use(new LocalStrategy((username, password, done) => {
        console.log(username);
        User.findOne({ username: username }).then(user => {
            if (!user) return done(null, false, {message: 'Wrong username'});
            if (!user.authenticate(password)) return done(null, false, {message: 'Wrong password'});
            return done(null, user)
        })
    }));

    passport.serializeUser((user, done) => {
        if (user) return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (!user) return done(null, false);
            return done(null, user);
        })
    })
};
