//Auth-Token
const { AuthorizationError } = require("../Errors/ClientErrors");
const { verifyToken } = require("../services/jwt");
const {dataService} = require('../services/data');
require('dotenv').config();

function isAuthenticated(){
  return (req,res) => {
    const tokenName = process.env.JWT_TOKEN_NAME;
    const token = req.header(tokenName);
    if(!token){
      req.user = {
        type:'g',
      };
    }else{
        try{
         const verifiedToken =  verifyToken(token);
          req.user = {
            type:'u',
            _id:verifiedToken._id,
          };
        }catch(err){
          throw err;
        }
    }
    
  }
}


function authPage(...types){
  return (req,res) =>{
    if(!types.includes(req.user.type)){
      throw new AuthorizationError(); 
    }else{
      return true;
    }
  };
}

 function isAuthor(model,paramIdName){
   return async (req,res) =>{
     const dataActions = dataService(model);
     const userId = req.user._id;
     const resourceId = req.params[paramIdName] || req.params.id;
        
      const resource = await dataActions.getById(resourceId);
      const resourceAuthorId = resource.author.toString();

     if(userId !== resourceAuthorId){
      throw new AuthorizationError();
     }
   }
}


function checkSelfFollow(paramIdName){
  return (req,res)=>{
    const resourceId = req.params[paramIdName] || req.params.id;
    const userId = req.user._id;

    if(resourceId === userId){
      throw new AuthorizationError(`User can't do this type of action to himself`);
    }
  }
}

module.exports = {
  isAuthenticated,
  authPage,
  isAuthor,
  checkSelfFollow
}