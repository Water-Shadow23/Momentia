const { NotFoundError, RequestError, ValidationError, ConflictError } = require('../Errors/ClientErrors');
const { User } = require('../models/user');
const {isNumber} = require('../util');
const {dataService} = require('../services/data');


 function checkResource(model,paramIdName){
 return async (req,res)=>{
  const actions = dataService(model);
  const id = req.params[paramIdName] || req.params.id || req.user._id;
  const record =  await actions.getById(id)
   if(!record){
    throw new NotFoundError('Resource not found!');
   }
 } 
}

 function validateRequestData(model){
    return async (req,res) =>{
       const data = req.body;
       try{
        const pathsToSkip = Object.keys(model.schema.paths).filter(path=>!Object.keys(data).includes(path));
        await model.validate(data,{pathsToSkip:pathsToSkip});

       }catch(err){
         const errors = Object.fromEntries(Object.entries(err.errors).map(e=>[e[0],e[1].message])); 
         throw new ValidationError('Invalid request data',errors);
        }
    }
}

function validateRequestBody(...dataProperties){

  
  return (req,res) =>{

    if(Object.keys(req.body).length){

       const bodyKeys = Object.keys(req.body);
       if(bodyKeys.length !== dataProperties.length){
        throw new RequestError('Invalid request body');
       }else{
         for(let key of dataProperties){
           if(!bodyKeys.includes(key)){
             throw new RequestError('Invalid request body');
           }
         }
       }
       
    }else{
     throw new RequestError('Invalid request body');
    }

  }
}

function validatePartialRequestBody(...dataProperties){
   return (req,res)=>{

    const bodyKeys = Object.keys(req.body);

    if(bodyKeys.length){

      for(let key of bodyKeys){
        if(!dataProperties.includes(key)){
          throw new RequestError('Invalid request body');
        }
      }
      
    }else{
      throw new RequestError('Invalid request body');
    }
   };
}

function isLikedAlready(model,typeAction,paramIdName){

  const dataActions = dataService(model);
  
  return async (req,res) =>{
    const resourceId = req.params[paramIdName] || req.params.id;
    const userId = req.user._id;

    
    const record = await dataActions.getById(resourceId);
    const isDone = record['likes'].some(objId=>objId.toString()===userId);
    
    if(isDone && typeAction==='like'){
      throw new ConflictError(`User has already ${typeAction}d the record`);  
    }else if(!isDone && typeAction==='unlike'){
      throw new ConflictError(`User has already ${typeAction}d the record`);
    }

  };
}


function isFollowedAlready(model,typeAction){
  
  const dataActions = dataService(model);
  
  return async (req,res) =>{
    const resourceId = req.params.id;
    const userId = req.user._id;

    
    const record = await dataActions.getById(resourceId);
    const isDone = record["followers"].some(objId=>objId.toString()===userId);
    
    if(isDone && typeAction==='follow'){
      throw new ConflictError(`User has already ${typeAction}ed the record`);  
    }else if(!isDone && typeAction==='unfollow'){
      throw new ConflictError(`User has already ${typeAction}ed the record`);
    }

  };
}

function isSavedAlready(model,typeAction){
 
  const dataActions = dataService(model);
   
  return async (req,res)=>{
    const resourceId = req.params.id;
    const userId = req.user._id;
    
   const userData = await dataActions.getById(userId);
   const isSaved = userData["saved"].some(id=>id.toString()===resourceId);
   if(isSaved && typeAction==='save'){
    throw new ConflictError(`User has already ${typeAction}d the record`);
   }else if(!isSaved && typeAction==="unsave"){
    throw new ConflictError(`User has already ${typeAction}d the record`);
   }
  };
}

function checkIsValidQueryParams(listOfQueries){
 return (req,res)=>{
   let queryMissing = [];
   let queryRemoving = [];
   let queryTypes = [];
     
   for(let queryName in req.query){
     if(!listOfQueries.includes(queryName)){
      queryRemoving.push(queryName);
     }
   }
   for(let queryName of listOfQueries){
     if(!req.query.hasOwnProperty(queryName)){
      queryMissing.push(queryName);
     }
   } 
   
   if(queryMissing.length || queryRemoving.length){
    throw new RequestError('Invalid query parameters!'+' '+` Remove: ${queryRemoving.map(q=>`'${q}'`).join(", ")||"nothing"} ,  include: ${queryMissing.map(q=>`'${q}'`).join(", ")||"nothing"}`);
   }
    
   for(let queryName in req.query){
    if(!isNumber(req.query[queryName])){
      queryTypes.push(queryName);
    }
  }
  if(queryTypes.length){
    throw new RequestError(`Invalid query parameters! Queries: ${queryTypes.map(q=>`'${q}'`).join(", ")} must be of type Number`);
  }
  
 }
}

module.exports = {
 checkResource,
 validateRequestData,
 validateRequestBody,
 validatePartialRequestBody,
 isLikedAlready,
 isFollowedAlready,
 isSavedAlready,
 checkIsValidQueryParams
}
