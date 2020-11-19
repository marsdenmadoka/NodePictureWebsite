
//This module will be responsible for calling multiple other modules to populate viewModel for each section of the sidebar
var Stats = require('./stats'),
Images = require('./images'),
Comments = require('./comments');

module.exports = function(viewModel, callback){
    viewModel.sidebar = {
    stats: Stats(),
    popular: Images.popular(),
    comments: Comments.newest()
    };
    callback(viewModel);
    };