const {sign,verify} = require('jsonwebtoken');
const { CredentialError } = require('../Errors/ClientErrors');
require('dotenv').config({path:"./config.env"});

const secret = process.env.JWT_SECRET;

function createToken(payload){
 const token = sign(payload,secret,{expiresIn:'2d'});
 return token; 
}

function verifyToken(token){
 try{
  const verifedToken = verify(token,secret);
  return verifedToken
 }catch(err){
  if(err.name === 'TokenExpiredError'){
    throw new CredentialError('Expired Token'); 
  }else{
    throw new CredentialError("Invalid Token");
  }
 }
}

module.exports = {
 createToken,
 verifyToken,
}