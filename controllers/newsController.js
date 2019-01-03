const News = require('../models/NewsSchema');
const url = require('url');

module.exports = {
    get(req, res) {
        News.find({}).then(news => {
            news = news.sort().reverse();

            res.json({news: news});
        });
    },
    getId(req, res) {
        News.findById(req.params.id, (err, news) => {
            if(err)
                res.json({data: []});
            else
                res.json({data: news});
        })

    },
    getDelete(req, res) {
        if(req.user) {
            if (req.user.roles.includes('admin')) {
                News.deleteOne({_id: req.params.id})
                    .then(news => {
                        res.json({type: 'info', message: 'News deleted.'});
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({type: 'error', message: 'Cannot delete this news.'});
                    })
            } else
                res.status(401).send('Not authorized');
        } else
            res.status(401).send('Not authorized');
    },
    put(req, res) {
        if(req.user) {
            if (req.user.roles.includes('admin')) {
                News.findById(req.params.id, (err, news) => {
                    if(err)
                        res.json({type: 'error', message: 'Cannot edit this news.'});
                    else{
                        let edit = req.body;
                        news.title = edit.title;
                        news.imageUrl = edit.imageUrl;
                        news.content = edit.content;
                        news.save();
                        res.json({type: 'info', message: 'News edited.'});
                    }
                })
            } else
                res.status(401).send('Not authorized');
        } else
            res.status(401).send('Not authorized');
    },
    post(req, res) {
        let reqNews = req.body;
        if(req.user) {
            if (req.user.roles.includes('admin')) {
                News.create({
                    title: reqNews.title,
                    imageUrl: reqNews.imageUrl,
                    content: reqNews.content,
                    creationDate: Date.now()
                }).then(() => {
                    res.json({type: 'info', message: 'News added.'});
                }).catch(err => {
                    console.log(err);
                    res.json({type: 'error', message: 'Could not add news.'});
                })
            } else
                res.status(401).send('Not authorized');
        } else
            res.status(401).send('Not authorized');

    }
};