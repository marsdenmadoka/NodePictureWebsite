
var express = require('express'),
    router = express.Router(),
    Home = require('../controllers/home'),
    Image = require('../controllers/image');
    path = require('path')
    multer = require('multer');
    upload = multer({ dest:path.join(__dirname,'public/upload/temp')})
    //upload = multer({ dest: 'uploads/' })

module.exports = function(app) {
    router.get('/', Home.home);//var Home and controller home funtion in home.js //render the index.handlesbars of the site
    router.get('/images/:image_id', Image.image);//image function in the controller image.js 
    router.post('/images',upload.single(Image.create));//create function in the controller image.js//when a user submits and uploads a new image
    router.post('/images/:image_id/like', Image.like);//like function in the controller image.js//when a user clicks the Like button
    router.post('/images/:image_id/comment', Image.comment);//comment function in the controller image.js//when a user posts a  comment)
    app.use(router);

};