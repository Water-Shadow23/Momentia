const {Router} = require('express');
const { isAuthenticated } = require('../middlewares/guards');
const {  tryCatch } = require('../middlewares/errorLayer');

const { authRouter } = require('./auth');
const { userRouter } = require('./user');
const { detailsRouter } = require('./details');
const { notfoundRouter } = require('./notfound');
const { postRouter } = require('./post');

const router = Router();
router.use(tryCatch(isAuthenticated()));

router.use(authRouter);
router.use(userRouter);
router.use('/posts',postRouter);
router.use('/posts',detailsRouter);

router.use(notfoundRouter);

module.exports = {
    router
}

