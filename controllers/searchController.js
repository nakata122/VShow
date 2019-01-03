const Articles = require('../models/ItemSchema');

module.exports = {
    post(req, res) {
        Articles.find({ "title": { "$regex": req.body.search, "$options": "i" } }).then(articles => {
            if(req.isAuthenticated())
                res.render('search-results', {articles, isAuthenticated: true, email: req.user.email, first: req.app.locals.first, search: req.body.search});
            else
                res.render('search-results', {articles, isAuthenticated: false, first: req.app.locals.first, search: req.body.search});
        })
    }
};