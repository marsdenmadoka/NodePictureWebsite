//fetching our data from mongodb and displaying it to our index.handlebars
var sidebar = require('../helpers/sidebar');
ImageModel = require('../models').Image;

    module.exports = {
        home: function(req, res) {

            var viewModel = {
                images: []      
                 }

    ImageModel.find({}, {}, { sort: { timestamp: -1 }},// we provide no specifics for the actual query (a blank JavaScript object), which means it will return every  document //sorted by timestamp in descending order  
                function(err, images) {
                if (err) { throw err; }
        viewModel.images = images; //the one above in our home function
        sidebar(viewModel, function(viewModel) {
        res.render('index', viewModel);
        
            });
        });

    }
};

        


    //     //when we use our dummy dataa without database uncoment to try it
    //  ImageModel = require('../models').Image;
    // module.exports = {
    //     home: function(req, res) {
    //         var viewModel = {
    //             images: [
    //             {
    //             uniqueId:1,
    //             title:"sample image 1",
    //             description:"",
    //             filename:"sample1.jpg",
    //             views:0,
    //             likes:3,
    //             timestamp:Date.now
    //             }, {
    //             uniqueId:2,
    //             title:"sample image 5",
    //             description:"",
    //             filename:"sample2.jpg",
    //             views:4,
    //             likes:5,
    //             timestamp:Date.now
    //             }, {
    //             uniqueId:3,
    //             title:"sample image 2",
    //             description:"my pic",
    //             filename:"sample3.png",
    //             views:3,
    //             likes:2,
    //             timestamp:Date.now
    //             }, {
    //                 uniqueId:4,
    //                 title:"sample image 3",
    //                 description:"my pic",
    //                 filename:"sample3.png",
    //                 views:3,
    //                 likes:2,
    //                 timestamp:Date.now
    //                 }
    //         ]
    //     }

    //   sidebar(viewModel, function(viewModel) {
    //     res.render('index', viewModel);
    //      });
    //     }
    // }