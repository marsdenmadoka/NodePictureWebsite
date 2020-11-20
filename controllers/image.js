// The primary responsibility of the image function in our image controller is to retrieve
// the details for a single specific image and display that via its viewModel

var fs = require('fs'),
path = require('path');
var sidebar = require('../helpers/sidebar');
Models = require('../models');
module.exports = {
image: function(req, res) {

    var viewModel = {
        image: {},
        comments: []
        };

 //let's include a find call on the Image model so that we can look up an image specifically by its filename :
 Models.Image.findOne({ filename: { $regex: req.params.image_id }}, //Image is our model in model/image.js
    function(err, image) {
    if (err) { throw err; }
    if (image) {
    // to do...
    } else {
     res.redirect('/');
  }
 });


sidebar(viewModel,function(viewModel){
    res.render('image', viewModel);
    });
},



create: function(req, res) { //when a user submits and uploads a new image
     var saveImage = function() { 
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789', //We need to generate a random six-digit alphanumeric string to represent a unique identifier for an image.
            imgUrl = '';
            for(var i=0; i < 6; i+=1) {
            imgUrl += possible.charAt(Math.floor(Math.random() *
            possible.length));
            }
            //Here, we declare three variables; where our uploaded files will be stored temporarily,
            var tempPath = req.files.file.path,
              ext = path.extname(req.files.file.name).toLowerCase(),
              targetPath = path.resolve('./public/upload/' + imgUrl + ext);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ==='.gif') { //checks to make sure that the uploaded file extension matches a list of allowable extensions
                fs.rename(tempPath, targetPath, function(err) {//If a valid image file was uploaded, it is moved from the temp folder  via the filesystem's rename function.
                if (err) throw err;
                res.redirect('/images/'+ imgUrl);
                });
                } else { //if uploaded file was invalid
                fs.unlink(tempPath, function () { //we call the unlink function of the fs module,which will delete the original file (from the temp directory it was uploaded to
                if (err) throw err;
                res.json(500, {error: 'Only image files are allowed.'});
                });
                }
        };
        saveImage(); //we are going to call saveImage repeatedly to ensure that the unique identifier we generated is in fact unique and doesn't already exist in the database
},



like: function(req, res) {
    res.json({likes: 1});

},



comment: function(req, res) {
res.send('The image:comment POST controller');
}

    };






//   //when using our dummy data with no database
//     var fs = require('fs'),
//     path = require('path');
//     var sidebar = require('../helpers/sidebar');
    
//     module.exports = {
//     image: function(req, res) {
    
//             var viewModel = {
//                 image: {
//                 uniqueId:1,
//                 title:"sample image 1",
//                 description:"",
//                 filename:"sample1.jpg",
//                 views:0,
//                 likes:3,
//                 timestamp:Date.now()
//                 }, 
//                 comments: [
//                     {
//                 image_id:1,
//                 email:"mars@gmail.com",
//                 name:"barack",
//                 gravatar:'http://lorempixel.com/75/75/animals/1',
//                 comment:"hello word",
//                 timestap:Date.now()
//                 }, {
//                     image_id:1,
//                     email:"mkkk@gmail.com",
//                     name:"mcCain",
//                     gravatar:'http://lorempixel.com/75/75/animals/1',
//                     comment:"hello word",
//                     timestap:Date.now()
//                 }
//             ]
//         };
    
//     sidebar(viewModel,function(viewModel){
//         res.render('image', viewModel);
//         });
//     },
    
    
    
//     create: function(req, res) { //when a user submits and uploads a new image
//          var saveImage = function() { 
//                 var possible = 'abcdefghijklmnopqrstuvwxyz0123456789', //We need to generate a random six-digit alphanumeric string to represent a unique identifier for an image.
//                 imgUrl = '';
//                 for(var i=0; i < 6; i+=1) {
//                 imgUrl += possible.charAt(Math.floor(Math.random() *
//                 possible.length));
//                 }
//                 //Here, we declare three variables; where our uploaded files will be stored temporarily,
//                 var tempPath = req.files.file.path,
//                   ext = path.extname(req.files.file.name).toLowerCase(),
//                   targetPath = path.resolve('./public/upload/' + imgUrl + ext);
    
//                 if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ==='.gif') { //checks to make sure that the uploaded file extension matches a list of allowable extensions
//                     fs.rename(tempPath, targetPath, function(err) {//If a valid image file was uploaded, it is moved from the temp folder  via the filesystem's rename function.
//                     if (err) throw err;
//                     res.redirect('/images/'+ imgUrl);
//                     });
//                     } else { //if uploaded file was invalid
//                     fs.unlink(tempPath, function () { //we call the unlink function of the fs module,which will delete the original file (from the temp directory it was uploaded to
//                     if (err) throw err;
//                     res.json(500, {error: 'Only image files are allowed.'});
//                     });
//                     }
//             };
//             saveImage(); //we are going to call saveImage repeatedly to ensure that the unique identifier we generated is in fact unique and doesn't already exist in the database
//     },  
//     like: function(req, res) {
//         res.json({likes: 1});  
//     },
//     comment: function(req, res) {
//     res.send('The image:comment POST controller');
//     }   
//         };
//
//
