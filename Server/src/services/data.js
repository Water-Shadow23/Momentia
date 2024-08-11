const { User } = require("../models/user");
const { Comment } = require("../models/comment");

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
async function getByCustomRaw(model,filters){
  return model.findOne(filters);
}

async function getByIdProperty(model,id,name){
    const record = await model.findById(id).lean();
    const propertie = record[name];
    return propertie
}
async function getByIdAndPopulate(model,id,...properties){
  const query = model.findById(id).lean();
  if(properties){
    for(let entry of properties){
    query.populate({
      path:entry.path,
      model:entry.model,
      options:{
        limit:entry.limit,
        skip:(entry.count-1)*entry.limit
      }
    });
    }
  }
  const record = await query;
  return record;
}

async function getByCustomAndPopulate(model,filters,...properties){
  const query = model.findOne(filters).lean();
  if(properties){
    for(let entry of properties){
    query.populate({
      path:entry.path,
      model:entry.model,
      options:{
        limit:entry.limit || 0,
        skip:(entry.count-1)*entry.limit || 0
      }
    });
    }
  }
  const record = await query;
  return record;
}

async function getManyByCustomAndPopulate(model,filters,...properties){
  const queries =  model.find(filters).lean();
  if(properties){
   
     for(let entry of properties){
        queries.populate({
          path:entry.path,
          model:entry.model,
        });
      }
    
  }
  const records = await queries;
  return records;
}

async function createRecord(model,data){
 const newRecord = new model(data);
 await newRecord.save();

    return getById(model,newRecord._id);
}
async function createRecordAndPopulate(model,data,properties){
  const newRecord = new model(data);
  await newRecord.save();
 
     return model.findOne({_id:newRecord._id})
     .populate(properties)
     .lean();
     ;
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
         ["getByCustomRaw"]:bind(getByCustomRaw,model),  
         ["getByIdAndPopulate"]:bind(getByIdAndPopulate,model),  
         ["getByCustomAndPopulate"]:bind(getByCustomAndPopulate,model),  
         ["getManyByCustomAndPopulate"]:bind(getManyByCustomAndPopulate,model),  
         ["createRecord"]:bind(createRecord,model),  
         ["createRecordAndPopulate"]:bind(createRecordAndPopulate,model),  
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
