
var express = require('express'),
    router = express.Router(),
    Home = require('../controllers/home'),
    Image = require('../controllers/image');


module.exports = function(app) {
    router.get('/', Home.home);//var Home and controller home funtion in home.js //render the index.handlesbars of the site
    router.get('/images/:image_id', Image.image);//var Image and image function in the controller image.js 
    
    router.post('/images', Image.create);//var Image and create function in the controller image.js//cwhen a user submits and uploads a new image
    router.post('/images/:image_id/like', Image.like);//var Image and like function in the controller image.js//when a user clicks the Like button
    router.post('/images/:image_id/comment', Image.comment);//when a user posts a  comment)
    app.use(router);

};