var mongoose = require('mongoose'),
Schema = mongoose.Schema,
path = require('path');
var ImageSchema = new Schema({
    title:{type:String},
    description:{type:String},
    filename:{type:String},
    views:{type:String},
    likes:{type:String},
    timestamp:{type:Date,'default':Date.now},
});

ImageSchema.virtual('uniqueId')//We created a virtual property of uniqueId , which is just the filename with the file extension removed
.get(function() { //We created a virtual property of uniqueId , which is just the filename with the file extension removed
return this.filename.replace(path.extname(this.filename), '');// file namereturn the
});

module.exports = mongoose.model('Image', ImageSchema);

    