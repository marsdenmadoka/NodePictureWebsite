//This module will be responsible for calling multiple other modules to populate viewModel for each section of the sidebar
var Stats = require('./stats'),
Images = require('./images'),
Comments = require('./comments');
async = require('async');
//we hadt to use async to call our helpers models since we fethced data in db to the helpers models using async
module.exports = function(viewModel, callback){
  async.parallel([//we basically wrapped our existing code and integrated it into async.parallel so that we can easily tweak it a little later as we update each section of the sidebar helpers
        function(next) {
        next(null, Stats()); //our Stats function in the helpers/stats
        },

        function(next) {
        next(null, Images.popular()); //our popular function in the helpers/images
        },

        function(next) {
        Comments.newest(next); //our newest function in the helpers/comments
        }
  ], 

 function(err, results){ //The last parameter to the parallel function is an inline function that accepts a results array as its second parameter.
    viewModel.sidebar = { //when we build viewModel ,we are referring to indexes in the  results array. The index order is the order that the functions were defined in theoriginal array.
        stats: results[0],
        popular: results[1],
        comments: results[2]
};
   callback(viewModel);
    });

};

// The parallel function of async works in a similar way to its each function that we
// used earlier. The main difference is that parallel isn't performing the same function
// in a loop through a collection, but is instead performing a series of unique functions
// all at the same time




// module.exports = function(viewModel, callback){
//     viewModel.sidebar = {
//     stats: Stats(),
//     popular: Images.popular(),
//     comments: Comments.newest()
//     };
//     callback(viewModel);
//     };