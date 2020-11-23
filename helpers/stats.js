// The stats module is going to display a few random pieces of statistics about our
// app. Specifically, it will show the count for the total number of images , comments ,
// views , and likes for the entire website.
var models = require('../models'),
async = require('async');

module.exports = function(callback) {
   async.parallel([
        function(next) {
        next(null, 0);
        },

        function(next) {
        next(null, 0);
        },

        function(next) {
        next(null, 0);
        },

        function(next) {
        next(null, 0);
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