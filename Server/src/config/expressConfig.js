const express = require('express');
const { router } = require('../routes/router');
const { cors } = require('../middlewares/cors');
require('dotenv').config();

function expressConfig(app){
    app.use(express.json());
    app.use(cors({origin:process.env.ALLOWED_CLIENT_ORIGIN}))
    app.use('/api/v1',router);
}

module.exports = {
    expressConfig
}