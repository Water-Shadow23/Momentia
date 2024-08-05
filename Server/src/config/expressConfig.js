const express = require('express');
const { router } = require('../routes/router');
const { cors } = require('../middlewares/cors');
// const cors = require('cors');
require('dotenv').config();

function expressConfig(app){
    app.use(cors({
       origin:process.env.ALLOWED_CLIENT_ORIGIN,
       headers:'Content-Type, Auth-Key',
       methods:'*' 
    }))
    app.use(express.json());
    app.use('/api/v1',router);
}

module.exports = {
    expressConfig
}