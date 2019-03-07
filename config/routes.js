//const leaderboardController = require('../controllers/leaderboardController');
const newsController = require('../controllers/newsController');
// const inventoryController = require('../controllers/inventoryController');
const imageController = require('../controllers/imageController');
const expositionController = require('../controllers/expositionController');
// const auctionController = require('../controllers/auctionController');
const authController = require('../controllers/authController');
const path = require('path');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


module.exports = app => {
    app.use('/', authController);
    app.post('/api/images', upload.single('images'), imageController.post);
    app.delete('/api/images/:id', imageController.getDelete);
    app.put('/api/images', imageController.put);
    app.get('/api/images/user', imageController.getUser);
    app.get('/api/images/details/:id', imageController.getDetail);
    app.post('/api/expositions', expositionController.post);
    app.delete('/api/expositions/image/:expoId/:imgId', expositionController.getImageDelete);
    app.delete('/api/expositions/:id', expositionController.getDelete);
    app.get('/api/expositions/top', expositionController.getTop);
    app.post('/api/expositions/top', expositionController.postTop);
    app.get('/api/expositions/user', expositionController.getUser);
    app.get('/api/expositions/details/:id', expositionController.getDetail);
    app.get('/api/expositions/search/:name', expositionController.getSearch);
    app.post('/api/expositions/edit/:id', expositionController.postSave);
    app.get('/api/expositions/:max', expositionController.getAll);
    app.get('/news', newsController.get);
    
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
};