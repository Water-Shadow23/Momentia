const mongoose = require('mongoose');
require('../models/user');
require('dotenv').config({path:`./config.env`});

const collection = 'Momentia';
const connectionString = process.env.DB_CONNECTION_STRING+collection;

async function dbConfig(){
 try{
  await mongoose.connect(connectionString,{
   family:4,
  });
  console.log('Database connected!');
 }catch(err){
   console.error("Coudn't connect to database!" + "\n" + err.message);  
 }
}

module.exports = {
    dbConfig
}