module.exports={
    popular:function(){ //we will create a popular function that will be used to return a collection
       // of the most popular images on the website
        var images=[
            {
                uniqueId:1,
                title:'sample Image 1',
                description:'',
                filename:'sample1.jpg',
                views:0,
                likes:0,
                timestamp:Date.now()
            },
            {
                uniqueId:2,
                title:'sample Image 2',
                description:'',
                filename:'sample2.jpg',
                views:0,
                likes:0,
                timestamp:Date.now()
            },
            {
                uniqueId:3,
                title:'sample Image 3',
                description:'',
                filename:'sample3.jpg',
                views:0,
                likes:0,
                timestamp:Date.now()
            },
            {
                uniqueId:4,
                title:'sample Image 4',
                description:'',
                filename:'sample4.jpg',
                views:0,
                likes:0,
                timestamp:Date.now()
            }
        ];
        return images;
    }
}