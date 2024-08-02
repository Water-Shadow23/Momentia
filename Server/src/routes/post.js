const {Router} = require('express');
const { createPost, editPost, deletePost, likePost, unlikePost, savePost, unSavePost, getPostData, getAllPosts, getPostsFromFollowedUsers, getPostLikes } = require('../controllers/post');
const { tryCatchAsyncEnd,tryCatch,tryCatchAsync } = require('../middlewares/errorLayer');
const { authPage, isAuthor } = require('../middlewares/guards');
const { validatePartialRequestBody, validateRequestData, checkResource, isLikedAlready, isSavedAlready, validateRequestBody, checkIsValidQueryParams } = require('../middlewares/middleware');
const { Post } = require('../models/post');
const { User } = require('../models/user');

const postRouter = Router();

postRouter.post('/create',
                tryCatch(authPage('u')),
                tryCatch(validatePartialRequestBody(
                    "caption",
                    "postImage",
                    "hashTags"
                )),
                tryCatchAsync(validateRequestData(Post)),
                tryCatchAsyncEnd(createPost));

postRouter.patch('/:id/edit',
                tryCatch(authPage('u')),
                tryCatchAsync(checkResource(Post)),
                tryCatchAsync(isAuthor(Post)),
                tryCatch(validatePartialRequestBody(
                   "caption",
                   "hashTags"
                )),
                tryCatchAsync(validateRequestData(Post)),    
                tryCatchAsyncEnd(editPost));

postRouter.delete('/:id/delete',
                tryCatch(authPage('u')),
                tryCatchAsync(checkResource(Post)),    
                tryCatchAsync(isAuthor(Post)),
                tryCatchAsyncEnd(deletePost));


postRouter.patch('/:id/like',
              tryCatch(authPage('u')),
              tryCatchAsync(checkResource(Post)),
              tryCatchAsync(isLikedAlready(Post,'like')), 
              tryCatchAsyncEnd(likePost));                
postRouter.delete('/:id/unlike',
              tryCatch(authPage('u')),
              tryCatchAsync(checkResource(Post)),
              tryCatchAsync(isLikedAlready(Post,'unlike')),
              tryCatchAsyncEnd(unlikePost));      
              
postRouter.patch('/:id/save',
              tryCatch(authPage('u')),
              tryCatchAsync(checkResource(Post)),  
              tryCatchAsync(isSavedAlready(User,"save")),      
              tryCatchAsyncEnd(savePost));              
postRouter.delete('/:id/unsave',
              tryCatch(authPage('u')),
              tryCatchAsync(checkResource(Post)),
              tryCatchAsync(isSavedAlready(User,"unsave")),
              tryCatchAsyncEnd(unSavePost)); 
              
postRouter.get('/following',
              tryCatch(authPage('u')),
              tryCatch(checkIsValidQueryParams([
                'limit',
                'count'
              ])),
              tryCatchAsyncEnd(getPostsFromFollowedUsers) 
)
postRouter.get('/:id',
              tryCatch(authPage('u')),
              tryCatchAsync(checkResource(Post)),
              tryCatchAsyncEnd(getPostData) 
);

postRouter.get('/',
              tryCatch(authPage('u','g')),
              tryCatch(checkIsValidQueryParams([
                'limit',
                'count'
              ])),
              tryCatchAsyncEnd(getAllPosts) 
)

postRouter.get('/:id/likes',
  tryCatch(authPage('u')),
  tryCatch(checkIsValidQueryParams([
     'limit',
     'count' 
  ])),
  tryCatchAsyncEnd(getPostLikes)
)

module.exports = {
    postRouter
}