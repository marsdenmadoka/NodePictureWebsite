
var fs = require('fs'),
path = require('path');
var sidebar = require('../helpers/sidebar');
Models = require('../models');

module.exports = {

image: function(req, res) { // The primary responsibility of the image function in our image controller is to retrieve
    // the details for a single specific image and display that via its viewModel
    var viewModel = {
        image: {},
        comments: []
        };

 //let's include a find call on the Image model so that we can look up an image specifically by its filename :
//performing findOne , which is identical to find , except it will only ever return a single document (matching or not) instead of an array as find returns.
 Models.Image.findOne({ filename: { $regex: req.params.image_id }}, //Image is our model in model/image.js //where the filename is a regex match to the URL image_id parameter'/images/:image_id'
    function(err, image) {
    if (err) { throw err; } //checking to make sure our err object isn't null, 
    if (image) {//if it's not null, that means a model was returned from MongoDB;
    //We attach the image model that was returned from findOne to our viewModel
        image.views = image.views + 1;//this views come from our model/image.js incrementing the views property of that model by 1 (so that we represent our actual plus one view as we load the page).
        viewModel.image = image; //the viewmodel.image from our view model below the image function
        image.save(); //Save the image model since its views have been updated

           //retrieve a list of commentsassociated with the image
          //we  pass in an object that contains our query as the first parameter; in this case, we are specifying that we want all comments
          //where the image_id field is equal to the _id property of the main image model we attached to our viewModel earlier.
        Models.Comment.find({ image_id: image._id}, {}, { sort: {'timestamp': 1 }},//Find all comments with the image_id property equal to the _id of the original image model
            function(err, comments){
            if (err) { throw err; }
            viewModel.comments = comments; //Attach the array of found comments to viewModel

            sidebar(viewModel, function(viewModel) {
            res.render('image', viewModel);
            });
            }
            );

    } else {//If an image model wasn't returned because we tried searching for an image by a filename that doesn't exist,we simply redirect the user back to the homepage
     res.redirect('/');
  }
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
            // search for an image with the same filename by performing a find:
            Models.Image.find({ filename: imgUrl }, function(err, images) {
            if (images.length> 0) {
            // if a matching image was found, try again (start over):since we dont want to give our images the same name.we want them to have a unique name
            saveImage();
            } else {
            //Here, we declare three variables; where our uploaded files will be stored temporarily,
            var tempPath = req.files.file.path,
              ext = path.extname(req.files.file.name).toLowerCase(),
              targetPath = path.resolve('./public/upload/' + imgUrl + ext);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ==='.gif') { //checks to make sure that the uploaded file extension matches a list of allowable extensions
                fs.rename(tempPath, targetPath, function(err) {//If a valid image file was uploaded, it is moved from the temp folder  via the filesystem's rename function.
                if (err) {throw err;}
                //if no error
             var newImg = new Models.Image({ //create a brand new Image model and pass in the default values via its constructor
                    title: req.body.title, //The title and description fields get set right from the values passed in via the HTML form using req.body
                    description: req.body.description,
                    filename: imgUrl + ext//the randomly generated filename and the image's original extension.
                    });
                    newImg.save(function(err, image) { //save to the databasehe ,the save function accepts  a second parameter in its callback, which will be the updated version of itself.
                    console.log('Successfully inserted image: ' + image.filename);
                    res.redirect('/images/' + image.uniqueId);
                    });
                });
                } else { //if uploaded file was invalid
                fs.unlink(tempPath, function () { //we call the unlink function of the fs module,which will delete the original file (from the temp directory it was uploaded to
                if (err) throw err;
                res.json(500, {error: 'Only image files are allowed.'});
                });
                }
            }
                });
        };
        saveImage(); //we are going to call saveImage repeatedly to ensure that the unique identifier we generated is in fact unique and doesn't already exist in the database
},


like: function(req, res) {
    Models.Image.findOne({ filename: { $regex: req.params.image_id } //use the Mongoose Image model to find an image with a filename that matches the image_id passed in via the URL
    },
    function(err, image) {
 // assuming we get a valid image model response from the query, we'll then increment its likes property, and since the model is then modified,we need to execute its save function.
    if (!err && image) {//"if the err object is false (that is null) and the image object is true(not null)
    image.likes = image.likes + 1;
    image.save(function(err) {
    if (err) {
    res.json(err);
    } else {
    res.json({ likes: image.likes });//we send a JSON response back to the browser with the real current value of the image's likes.
    }
    });
    }
    });

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
