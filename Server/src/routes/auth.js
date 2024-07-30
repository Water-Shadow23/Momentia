const {Router} = require('express');
const { loginController, registerController } = require('../controllers/auth');
const { authPage } = require('../middlewares/guards');
const {  tryCatch ,  tryCatchAsync, tryCatchAsyncEnd} = require('../middlewares/errorLayer');
const { validateRequestData, validateRequestBody } = require('../middlewares/middleware');
const { User } = require('../models/user');

const authRouter = Router();

authRouter.post('/login',tryCatch(authPage('g')),
                         tryCatch(validateRequestBody('username','password')),
                         tryCatchAsync(validateRequestData(User)),
                         tryCatchAsyncEnd(loginController));

authRouter.post('/register',tryCatch(authPage('g')),
                             tryCatch(validateRequestBody('username','password','email','fullName')),
                             tryCatchAsync(validateRequestData(User)), 
                             tryCatchAsyncEnd(registerController))

module.exports = {
    authRouter
}

