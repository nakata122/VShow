const Users = require('../models/UserSchema');
const Items = require('../models/ItemSchema');

module.exports = {
    get(req, res) {
        if(req.user){
            if(!req.user.roles.includes('admin')) {
                Items.find({'_id': {$in: req.user.inventory}}).then(arr => {
                    let items = {};
                    arr.forEach(it => items[it._id] = it);
                    let inv = req.user.inventory.map(id => items[id]);
                    res.json({inventory: inv});
                });
            } else {
                Items.find({}).then(items => {
                    res.json({inventory: items});
                });
            }
        }
        else res.status(401).send('Not authorized');
    }
};