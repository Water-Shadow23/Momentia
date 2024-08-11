const {model,Schema,SchemaTypes} = require('mongoose');

const commentSchema = new Schema({
 author:{
 type:SchemaTypes.ObjectId,
  ref:"User",
  required:true,
 },
 post:{
 type:String,
 required:true 
 },
 content:{
     type:String,
     required:true,
     maxLength:[250,"Comment needs to be max 250 characters"]
 },
 likes:{
  type:[SchemaTypes.ObjectId],
  default:[],
  ref:"User",
 },
});

const Comment = model('comment',commentSchema);

module.exports = {
    Comment
}