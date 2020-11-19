// The stats module is going to display a few random pieces of statistics about our
// app. Specifically, it will show the count for the total number of images , comments ,
// views , and likes for the entire website.
module.exports = function() {
    var stats = {
    images: 0,
    comments: 0,
    views: 0,
    likes: 0
    };
    return stats;
    };