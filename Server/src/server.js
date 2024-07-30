const express = require('express');
const { expressConfig } = require('./config/expressConfig');
const { dbConfig } = require('./config/dbConfig');

require('dotenv').config({path:`./config.env`});

const PORT = process.env.PORT;

const app = express();

async function serverStart(){
    await dbConfig();
    expressConfig(app);
    app.listen(PORT,(err)=>{
     if(err){
         console.error(err.message);
         return;
     }   
     console.log(`Server is running on http://localhost:${PORT}`);
    });
}

serverStart();