var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    image_id:{type:ObjectId}, //field labeled image_id , which has an ObjectId type. We're going to use this
                           // field to store the relationship between comment and image that it was posted to
    email:{type:String},
    name:{type:String},
    gravatar:{type:String},
    comment:{type:String},
    timestamp:{type:Date,'default':Date.now}
});

CommentSchema.virtual('image').set(function(image){
    this._image = image;
    }).get(function() {
    return this._image;
    });
    module.exports = mongoose.model('Comment', CommentSchema);
    