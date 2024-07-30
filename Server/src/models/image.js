const {model,Schema,SchemaTypes} = require('mongoose');

const imageSchema = new Schema({
 name:{
   type:[String,'Incorrect Type! Image name must be string'],
 },
 data:{
    type:[Uint8Array,'Incorrect Type! Image data must be Uint8Array'],
 }
});

const Image = model('image',imageSchema);

module.exports = {
    Image
}