var ImageModel = require('../../models/image');

describe('Image Model', function() {
    var image;
    it('should have a mongoose schema', function(){
        expect(ImageModel.schema).to.be.defined;
    });
        beforeEach(function(){
            image = new ImageModel({
                title: 'Test',
                description: 'Testing',
                filename: 'testfile.jpg'
            });
     });
        // to do: write tests...
 describe('Schema', function() {//Here, we check to ensure that each property we expect an ImageModel instance
             // to have is defined. For the properties that have default values set, we also check to ensure the default values are set as well.
   
    it('should have a title string', function(){
        expect(image.title).to.be.defined;
    });

    it('should have a description string', function(){
        expect(image.description).to.be.defined;
    });

    it('should have a filename string', function(){
        expect(image.filename).to.be.defined;
    });

    it('should have a views number default to 0', function(){
       expect(image.views).to.be.defined;
       expect(image.views).to.equal(0);
    });

    it('should have a likes number default to 0', function(){
       expect(image.likes).to.be.defined;
       expect(image.likes).to.equal(0);
    });

    it('should have a timestamp date', function(){
        expect(image.timestamp).to.be.defined;
    });
  })
  //we test against the virtuals we expect ImageModel to have, and verify that they function the way they're supposed to:
 describe('Virtuals', function(){
    describe('uniqueId', function(){

        it('should be defined', function(){
           expect(image.uniqueId).to.be.defined;
        });

        it('should get filename without extension', function(){
           expect(image.uniqueId).to.equal('testfile');
           });
      });
  });
    // When testing the uniqueId virtual, it should return the image model's filename
    // without the extension. As the beforeEach defined our image model with a filename of testfile.jpg ,

})