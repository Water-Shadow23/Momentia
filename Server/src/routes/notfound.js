const {Router} = require('express');
const { NotFoundError } = require('../Errors/ClientErrors');
const { tryCatch } = require('../middlewares/errorLayer');

const notfoundRouter = Router();

notfoundRouter.get('*',tryCatch((req,res)=>{
    //404 Not Found
  throw new NotFoundError();
}));
notfoundRouter.post('*',tryCatch((req,res)=>{
    //404 Not Found
  throw new NotFoundError();
}));
notfoundRouter.put('*',tryCatch((req,res)=>{
    //404 Not Found
  throw new NotFoundError();
}));
notfoundRouter.patch('*',tryCatch((req,res)=>{
    //404 Not Found
  throw new NotFoundError();
}));
notfoundRouter.delete('*',tryCatch((req,res)=>{
    //404 Not Found
  throw new NotFoundError();
}));


module.exports = {
    notfoundRouter
}