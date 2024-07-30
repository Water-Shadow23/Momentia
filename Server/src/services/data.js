const { User } = require("../models/user");

async function getAll(model){
    return model.find({}).lean();
}
async function getByChunks(model,filterBy,skipValue,limitValue){
  return model.find(filterBy).skip(skipValue).limit(limitValue);
}
async function getById(model,id){
   return model.findById(id).lean();
}
async function getByIdRaw(model,id){
    return model.findById(id);
}
async function getByCustom(model,filters){
    return model.findOne(filters).lean();
}
async function getByIdProperty(model,id,name){
    const record = await model.findById(id).lean();
    const propertie = record[name];
    return propertie
}
async function getByIdAndPopulate(model,id,...properties){
  const query = model.findById(id);
  for(let propName of properties){
   query = query.populate(propName);
  }
  const record = await query.lean();
  return record.lean();
}
async function createRecord(model,data){
 const newRecord = new model(data);
 await newRecord.save();

    return getById(model,newRecord._id);
}
async function updateRecordById(model,id,updateObj){
   const updatedRecord = await model.findByIdAndUpdate({_id:id},{$set:updateObj},{new:true}).lean();
   return updatedRecord;
}
async function updateRecordArray(model,type,resourceid,updateObj){
   return model.findByIdAndUpdate(resourceid,{[`$${type}`]:updateObj},{new:true}).lean();
}
async function deleteRecordById(model,id){
    await model.findByIdAndDelete({_id:id});
    return true;
}

function bind(func,...properties){
    return func.bind(null,...properties);
}

module.exports = {
    dataService:(model)=>{
       return {
         ["getAll"]:bind(getAll,model),  
         ["getByChunks"]:bind(getByChunks,model),
         ["getById"]:bind(getById,model),  
         ["getByCustom"]:bind(getByCustom,model),  
         ["getByIdAndPopulate"]:bind(getByIdAndPopulate,model),  
         ["createRecord"]:bind(createRecord,model),  
         ["updateRecordById"]:bind(updateRecordById,model),  
         ["deleteRecordById"]:bind(deleteRecordById,model),
         ["getByIdRaw"]:bind(getByIdRaw,model),
         ["getByIdProperty"]:bind(getByIdProperty,model),

         ["addLike"]:bind(updateRecordArray,model,"push"),
         ["unLike"]:bind(updateRecordArray,model,"pull"),
         ["follow"]:bind(updateRecordArray,model,"push"),
         ["unfollow"]:bind(updateRecordArray,model,"pull"),
         ["updateRecordAndPushToArray"]:bind(updateRecordArray,model,"push"),
         ["updateRecordAndPullFromArray"]:bind(updateRecordArray,model,"pull"),
       } 
    }
}
