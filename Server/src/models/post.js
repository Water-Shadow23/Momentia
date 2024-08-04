const {model,Schema,SchemaTypes} = require('mongoose');

const postSchema = new Schema({
 id:{
  type:String,
  required:true,
  match:[/[A-Za-z0-9_]+/g,'id must be alphanumeric value'],
 },  
 author:{
    required:true,
    ref:"User",
    type:SchemaTypes.ObjectId
 },
 postImage:{
  required:false,
  ref:"Image",
  type:SchemaTypes.ObjectId,
 },
 caption:{
    type:String,
    maxLength:[2200,'Caption should max 2200 characters'] 
 },
 likes:{
    type:[SchemaTypes.ObjectId],
    ref:"User",
    default:[]
 },
 hashTags:{
   type:[String],
   default:[],
   validate:{
     validator:(arr)=>{
       return arr.every(el=>el.startsWith('#'));
      },
     message:" All hashtags must start with '#' " 
   }
}
});

const Post = model('post',postSchema);

module.exports = {
    Post
}