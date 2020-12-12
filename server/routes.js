var express = require('express'),
    router = express.Router(),
    Home = require('../controllers/home'),
    Image = require('../controllers/image');
    path = require('path')
    multer = require('multer');
    upload=multer().single('avatar')

    // multer = require('multer');
    // upload = multer({ dest:path.join(__dirname,'public/upload/temp')})
module.exports = function(app) { //include the .initialize when writting the test
    router.get('/', Home.home);//var Home and controller home funtion in home.js //render the index.handlesbars of the site
    router.get('/images/:image_id', Image.image);//image function in the controller image.js

    router.post('/images',function(req,res){ //we are using multer to upload our image hence need for middleware
        upload(req,res,function(err){
        if (err instanceof multer.MulterError) {console.log(err) } 
        else if (err) {console.log(err) }
        //if everything is fine
          Image.create//create function in the controller image.js//when a user submits and uploads a new image
        })
    });
    router.post('/images/:image_id/like', Image.like);//like function in the controller image.js//when a user clicks the Like button
    router.post('/images/:image_id/comment', Image.comment);//comment function in the controller image.js//when a user posts a  comment)
    router.delete('/images/:image_id', Image.remove);
    app.use(router);

};

// router.post('/images',upload.single(Image.create))