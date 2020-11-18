

module.exports = {
image: function(req, res) {

        var viewModel = {
            image: {
            uniqueId:1,
            title:"sample image 1",
            description:"",
            filename:"sample1.jpg",
            views:0,
            likes:3,
            timestamp:Date.now()
            }, 
            comments: [
                {
            image_id:1,
            email:"mars@gmail.com",
            name:"barack",
            gravatar:'http://lorempixel.com/75/75/animals/1',
            comment:"hello word",
            timestap:Date.now()
            }, {
                image_id:1,
                email:"mkkk@gmail.com",
                name:"mcCain",
                gravatar:'http://lorempixel.com/75/75/animals/1',
                comment:"hello word",
                timestap:Date.now()
            }
        ]
    };

res.render('image',viewModel);
},

create: function(req, res) {
res.send('The image:create POST controller');
},

like: function(req, res) {
res.send('The image:like POST controller');
},

comment: function(req, res) {
res.send('The image:comment POST controller');
}

    };