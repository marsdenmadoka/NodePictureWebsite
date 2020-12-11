var chai = require('chai'),
sinon = require('sinon'),
sinonChai = require('sinon-chai');
global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);









// var expect = require('chai').expect;
// // "test": "mocha"
// //this is just a test demo
// describe('The code', function() {//A describe block is a way to define a specific group of test cases in single line. You can have many describe blocks in a test file
    
//     beforeEach(function(){ //A beforeEach and afterEach block is checked for to see whether there is any pretest work that needs to be executed before each test is executed.
    
//     });
//     afterEach(function(){//Likewise, any cleanup that needs to occur between tests can be taken care of within the afterEach block Both of these blocks are optional and therefore not required.
    
//      });

//     it('should test something', function(){ //Within the describe block,defining individual tests is done with it statements.
//     var something = 1;
//      // here we "expect" some condition to declare our test

//     expect(something).to.exist;
//  });

//     it('should test something_else', function(){
//         var something_else = false;
//         // now we test a different variable against its value and expect that value to equal false
//     expect(something_else).to.equal(false);
//     });

// });