// the comments module will return a collection of the newest comments posted to the site.
//The idea of particular interest is that each comment also has an image attached to it so that the actual image for each comment
//can be displayed as a thumbnail while displaying the list of comments

//THIS MODULE IS TO DISPLAY THE NEWEST COMMENTS ONLY
module.exports = {
    newest: function() {
    var comments = [
    {
    image_id:1,
    email:'test@testing.com',
    name: 'Test Tester',
    gravatar: 'http://lorempixel.com/75/75/animals/1',
    comment:'This is a test comment...',
    timestamp: Date.now(),
        image: {
        uniqueId: 1,
        title:'Sample Image 1',
        description: '',
        filename:'sample1.jpg',
        views: 0,
        likes: 0,
        timestamp:Date.now
        }
    }, 

    {
    image_id:1,
    email:'test@testing.com',
    name: 'Test Tester',
    gravatar: 'http://lorempixel.com/75/75/animals/2',
    comment:'Another followup comment!',
    timestamp: Date.now(),
        image: {
        uniqueId: 1,
        title: 'Sample Image 1',
        description: '',
        filename: 'sample1.jpg',
        views: 0,
        likes:0,
        timestamp:Date.now
            }
         }
         
       ];
return comments;
    }
};