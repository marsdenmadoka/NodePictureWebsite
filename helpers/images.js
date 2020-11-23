var models = require('../models');
//we will create a popular function that will be used to return a collection
// of the most popular images on the website

module.exports = {  
    popular: function(callback) { 
        models.Image.find({}, {}, { limit: 9, sort: { likes: -1 }},//We just query MongoDB and find the top nine most liked images by sorting the images by total such as
            //count in descending order and limiting the results to nine documents.
        function(err, images) {
        if (err) throw err;
        callback(null, images);
        });
    }
};












// module.exports={
//     popular:function(){ 
//        
//         var images=[
//             {
//                 uniqueId:1,
//                 title:'sample Image 1',
//                 description:'',
//                 filename:'sample1.jpg',
//                 views:0,
//                 likes:0,
//                 timestamp:Date.now()
//             },
//             {
//                 uniqueId:2,
//                 title:'sample Image 2',
//                 description:'',
//                 filename:'sample2.jpg',
//                 views:0,
//                 likes:0,
//                 timestamp:Date.now()
//             },
//             {
//                 uniqueId:3,
//                 title:'sample Image 3',
//                 description:'',
//                 filename:'sample3.jpg',
//                 views:0,
//                 likes:0,
//                 timestamp:Date.now()
//             },
//             {
//                 uniqueId:4,
//                 title:'sample Image 4',
//                 description:'',
//                 filename:'sample4.jpg',
//                 views:0,
//                 likes:0,
//                 timestamp:Date.now()
//             }
//         ];
//         return images;
//     }
// }