//const leaderboardController = require('../controllers/leaderboardController');
const newsController = require('../controllers/newsController');
// const inventoryController = require('../controllers/inventoryController');
// const itemController = require('../controllers/itemController');
// const auctionController = require('../controllers/auctionController');
const authController = require('../controllers/authController');
const path = require('path');


module.exports = app => {
     app.use('/', authController);
    // app.get('/inventory', inventoryController.get);
    //app.get('/topTen', leaderboardController.get);
    app.get('/news', newsController.get);
    // app.get('/news/:id', newsController.getId);
    // app.delete('/news/:id', newsController.getDelete);
    // app.put('/news/:id', newsController.put);
    // app.post('/news', newsController.post);
    // app.get('/randomItem', itemController.getRandom);
    // app.get('/items/:id', itemController.get);
    // app.post('/items', itemController.post);
    // app.put('/items/:id', itemController.put);
    // app.delete('/items/:id', itemController.remove);
    // app.post('/auction', auctionController.post);
    // app.get('/auction', auctionController.get);
    // app.post('/bid/:id', auctionController.bid);
    
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
};