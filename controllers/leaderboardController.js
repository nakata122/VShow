const Users = require('../models/UserSchema');

module.exports = {
    get(req, res) {
        Users.find({}).sort({money: -1}).limit(10).exec(
            function(err, users) {
                let usernames = [];
                for(let i=0;i<10;i++)
                    if(users[i]) usernames[i] = users[i].username;
                res.json(usernames);
            }
        );
    }
};