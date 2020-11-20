var mongoose = require('mongoose'),
Schema = mongoose.Schema,
path = require('path');
ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    image_id:{type:ObjectId}, //we will link this id to our image
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
    