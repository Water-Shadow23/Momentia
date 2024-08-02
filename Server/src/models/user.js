const {model,Schema,SchemaTypes} = require('mongoose');

const userSchema = new Schema({
 username:{
  required:true,
  type:String,
  minLength:[4,'Username should be atleast 4 characters'],
  
 },
 fullName:{
    required:true,
    type:String,
 },
 email:{
    required:true,
    type:String,
    minLength:[10,'Email should be atleast 5 characters']
 },
 password:{
    required:true,
    type:String,
    // match
 },
 bio:{
    type:String,
    minLength:0,
    maxLength:[150,'Bio should be max 150 characters']
 },
 profilePhoto:{
    ref:"Image",
    type:SchemaTypes.ObjectId 
 },
 posts:{
   type:[SchemaTypes.ObjectId],
   ref:"Post",
   default:[]
 },
 saved:{
   type:[SchemaTypes.ObjectId],
   ref:"Post",
   default:[]
 },
 followers:{
  type:[SchemaTypes.ObjectId],
  ref:"User",
  default:[]
 },
 following:{
  type:[SchemaTypes.ObjectId],
  ref:"User",
  default:[]
 },
 interests:{
   type:[String],
   default:[]
 },
 gender:{
   type:String,
   enum:{
    values:['male','female','preferNotToSay'],
    message:`{VALUE} is not valid value`
  },
   default:"preferNotToSay"
 },
 website:{
  type:String,
 },
 job:{
   type:String
 }
});

const User = model('user',userSchema);

module.exports = {
    User
}