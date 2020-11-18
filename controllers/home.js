    module.exports = {
        home: function(req, res) {
            var viewModel = {
                images: [
                {
                uniqueId:1,
                title:"sample image 1",
                description:"",
                filename:"sample1.jpg",
                views:0,
                likes:3,
                timestamp:Date.now
                }, {
                uniqueId:2,
                title:"sample image 5",
                description:"",
                filename:"sample2.jpg",
                views:4,
                likes:5,
                timestamp:Date.now
                }, {
                uniqueId:3,
                title:"sample image 2",
                description:"my pic",
                filename:"sample3.png",
                views:3,
                likes:2,
                timestamp:Date.now
                }, {
                    uniqueId:4,
                    title:"sample image 3",
                    description:"my pic",
                    filename:"sample3.png",
                    views:3,
                    likes:2,
                    timestamp:Date.now
                    }
            ]
        }

       res.render('index',viewModel)

        }
        };

        