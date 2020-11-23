// The stats module is going to display a few random pieces of statistics about our
// app. Specifically, it will show the count for the total number of images , comments ,
// views , and likes for the entire website.
var models = require('../models'),
async = require('async');

module.exports = function(callback) {
   async.parallel([
        function(next) {
        models.Image.count({}, next); //count al the number of images
        },

        function(next) {
        models.Comment.count({}, next);//count al the number of comments for all images
        },

        function(next) { //get total views and likes for every image. We can't use MongoDB's count method because that only counts individual documents in a collection. We need to use MongoDB's aggregatefunctionality instead.
          models.Image.aggregate({ $group : {
            _id : '1',                    //Using MongoDB's aggregate function, we are telling MongoDB to group every document together and sum up all of their views into a single new field called viewsTotal .
            viewsTotal : { $sum : '$views' }
            }}, 
            function(err, result) {
            var viewsTotal = 0;
            if (result.length> 0) {
            viewsTotal += result[0].viewsTotal;
            }
            next(null, viewsTotal);
            });
        }, 

        function(next) {
            models.Image.aggregate({ $group : {
                _id : '1',
                likesTotal : { $sum : '$likes' }
                }}, function (err, result) {
                var likesTotal = 0;
                if (result.length> 0) {
                likesTotal += result[0].likesTotal;
                }
                next(null, likesTotal);
                });
        }
], 

function(err, results){
    callback(null, {
        images:results[0],
        comments: results[1],
        views:results[2],
        likes:results[3]

       });
    });
};







// module.exports = function() {
//     var stats = {
//     images: 0,
//     comments: 0,
//     views: 0,
//     likes: 0
//     };
//     return stats;
//     };