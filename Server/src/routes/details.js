const {Router} = require('express');
const { createComment,editComment,deleteComment, likeComment, unlikeComment, getComments } = require('../controllers/details');
const { tryCatch,tryCatchAsync,tryCatchAsyncEnd } = require('../middlewares/errorLayer');
const { authPage, isAuthor } = require('../middlewares/guards');
const { validateRequestBody, validateRequestData, isLikedAlready, checkResource, checkIsValidQueryParams } = require('../middlewares/middleware');
const { Comment } = require('../models/comment');

const detailsRouter = Router();

detailsRouter.get('/:id/comments',
    tryCatch(authPage('u')),
    tryCatchAsyncEnd(getComments)
);
detailsRouter.post('/:id/comments/create',
                            tryCatch(authPage('u')),
                            tryCatch(validateRequestBody(
                                "content"
                            )),
                            tryCatchAsync(validateRequestData(Comment)), 
                            tryCatchAsyncEnd(createComment));

detailsRouter.patch('/:id/comments/:comId/edit',
                            tryCatch(authPage('u')),
                            tryCatchAsync(isAuthor(Comment,'comId')),
                            tryCatch(validateRequestBody(
                                "content"
                            )),
                            tryCatchAsync(validateRequestData(Comment)), 
                            tryCatchAsyncEnd(editComment));

detailsRouter.delete('/:id/comments/:comId/delete',
                            tryCatch(authPage('u')),
                            tryCatchAsync(isAuthor(Comment,'comId')), 
                            tryCatchAsyncEnd(deleteComment));


detailsRouter.patch('/:id/comments/:comId/like',
              tryCatch(authPage('u')),
              tryCatchAsync(checkResource(Comment,'comId')),
              tryCatchAsync(isLikedAlready(Comment,'like','comId')), 
              tryCatchAsyncEnd(likeComment));                
detailsRouter.delete('/:id/comments/:comId/unlike',
              tryCatch(authPage('u')),
              tryCatchAsync(checkResource(Comment,'comId')),
              tryCatchAsync(isLikedAlready(Comment,'unlike','comId')),
              tryCatchAsyncEnd(unlikeComment));


module.exports = {
    detailsRouter
}