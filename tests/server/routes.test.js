// the routes.test.js file is going to be testing the functionalities of our routes.js file, 
//we need it to require the same modules.

var home = require('../../controllers/home'),
image = require('../../controllers/image'),
routes = require('../../server/routes');

describe('Routes', function(){
    var app = {
    get: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
    };

    beforeEach(function(){ //We include a beforeEach block to execute the initialize function before every one of our test runs.
    routes.initialize(app);
    });
    // to do: write tests...
    //test that the GET endpoints are configured correctly
    describe('GETs', function() {
        it('should handle /', function(){
        expect(app.get).to.be.calledWith('/', home.index);
        });
        it('should handle /images/:image_id', function(){
            expect(app.get).to.be.calledWith('/images/:image_id',image.index);
            });
     });

        //test the POST endpoints:
    describe('POSTs', function() {
        it('should handle /images', function(){
        expect(app.post).to.be.calledWith('/images', image.create);
        });

        it('should handle /images/:image_id/like', function(){
        expect(app.post).to.be.calledWith('/images/:image_id/like',image.like);
        });

        it('should handle /images/:image_id/comment', function(){
        expect(app.post).to.be.calledWith('/images/:image_id/comment',image.comment);
        });

    });

        //test the DELETE endpoint:
   describe('DELETEs', function() {
        it('should handle /images/:image_id', function(){
        expect(app.delete).to.be.calledWith('/images/:image_id', image.remove);
          });
        });

        
    });