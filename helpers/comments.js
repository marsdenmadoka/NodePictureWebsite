//The idea of particular interest is that each comment also has an image attached to it so that the actual image for each comment
//can be displayed as a thumbnail while displaying the list of comments
//THIS MODULE IS TO RETURN COLLECTION  THE NEWEST COMMENTS ONLY
var models = require('../models'),
async = require('async');
module.exports = {
    newest: function(callback) {
        models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 }//first parameter in the find query is an empty JavaScript object,meaning we will retrieve every comment in the database. For the third parameter,// however, we're using limit and sort so that we limit the number of records returned to five, and we sort the query by timestamp in descending order.
    },
    function(err, comments){
    // attach an image to each comment...
    var attachImage = function(comment, next) {//The next callback as the second parameter is important because it's the key to how async is able to function
        models.Image.findOne({ _id : comment.image_id},
        function(err, image) {
        if (err) throw err;
        comment.image = image;
        next(err);
        });
        };
        //we need to use the each function of async to apply that function to every item in the comments collection:
 async.each(comments, attachImage,
            function(err) {
            if (err) throw err;
            callback(err, comments);
            });
    })
    }
    };







// module.exports = {
//     newest: function() {
//     var comments = [
//     {
//     image_id:1,
//     email:'test@testing.com',
//     name: 'Test Tester',
//     gravatar: 'http://lorempixel.com/75/75/animals/1',
//     comment:'This is a test comment...',
//     timestamp: Date.now(),
//         image: {
//         uniqueId: 1,
//         title:'Sample Image 1',
//         description: '',
//         filename:'sample1.jpg',
//         views: 0,
//         likes: 0,
//         timestamp:Date.now
//         }
//     }, 

//     {
//     image_id:1,
//     email:'test@testing.com',
//     name: 'Test Tester',
//     gravatar: 'http://lorempixel.com/75/75/animals/2',
//     comment:'Another followup comment!',
//     timestamp: Date.now(),
//         image: {
//         uniqueId: 1,
//         title: 'Sample Image 1',
//         description: '',
//         filename: 'sample1.jpg',
//         views: 0,
//         likes:0,
//         timestamp:Date.now
//             }
//          }
         
//        ];
// return comments;
//     }
// };