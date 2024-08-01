const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const {dataService} = require('./data');
const { createToken } = require('./jwt');

const { RequestError, ConflictError } = require('../Errors/ClientErrors');

const actions = dataService(User);

async function login({username,password}){
  const user = await actions.getByCustom({username});
  if(!user){
    throw new RequestError("Invalid username or password!","UIError");
  }
    const result = await bcrypt.compare(password,user["password"]);
    if(!result){
        throw new RequestError("Invalid username or password!","UIError");
    }

   const token = createToken({
     username:user.username,
     _id:user._id,
   });

   

   return {
    token,
    id:user._id
  };

}

async function register({username,password,email,fullName}){
    const result = await actions.getByCustom({
      $or:[
        {email},
        {username}
      ]
    });
    if(result){
        throw new ConflictError("User with that username or email already exist!",'UIError');
    }
    const newUser = new User({
        username,
        password:await bcrypt.hash(password,10),
        email,
        fullName
    });

    await newUser.save();

    const token = createToken({
      username:newUser.username,
      _id:newUser._id,
    });
     
    return {
      token,
      id:newUser._id
    };
}



module.exports = {
    login,
    register
}