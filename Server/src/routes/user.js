const {Router} = require('express');
const { editProfile, deleteProfile, followProfile , unfollowProfile, getProfileSavedPost, getProfilePosts, getProfileData, getUserData, getUserPosts } = require('../controllers/user');
const { tryCatch , tryCatchAsync, tryCatchAsyncEnd } = require('../middlewares/errorLayer');
const { authPage, checkSelfFollow } = require('../middlewares/guards');
const { validatePartialRequestBody, validateRequestData, checkResource, isFollowedAlready, checkIsValidQueryParams } = require('../middlewares/middleware');
const { User } = require('../models/user');

const userRouter = Router();

userRouter.patch('/accaunts/edit',
    tryCatch(authPage('u')),
    tryCatchAsync(checkResource(User)),
    tryCatch(validatePartialRequestBody(
        "fullName",
        "interests",
        "bio",
        "gender",
        "website",
        "job"
    )), 
    tryCatchAsync(validateRequestData(User)),    
    tryCatchAsyncEnd(editProfile)
);
userRouter.delete('/accaunts/delete',
    tryCatch(authPage('u')),
    tryCatchAsync(checkResource(User)),
    tryCatchAsyncEnd(deleteProfile)
);

userRouter.get('/accaunts/posts',
    tryCatch(authPage('u')),
    tryCatch(checkIsValidQueryParams([
        'limit',
        'count'
      ])),
    getProfilePosts
);
userRouter.get('/accaunts/saved',
    tryCatch(authPage('u')),
    tryCatch(checkIsValidQueryParams([
        'limit',
        'count'
      ])),
    getProfileSavedPost   
);

userRouter.get('/accaunts',
    tryCatch(authPage('u')),
    getProfileData 
)

userRouter.patch('/accaunts/:id/follow',
    tryCatch(authPage('u')),
    tryCatchAsync(checkResource(User)),
    tryCatch(checkSelfFollow()),
    tryCatchAsync(isFollowedAlready(User,'follow')),
    tryCatchAsyncEnd(followProfile)
);
userRouter.delete('/accaunts/:id/unfollow',
    tryCatch(authPage('u')),
    tryCatchAsync(checkResource(User)),
    tryCatch(checkSelfFollow()),
    tryCatchAsync(isFollowedAlready(User,'unfollow')),
    tryCatchAsyncEnd(unfollowProfile)
);


userRouter.get('/accaunts/:id',
   tryCatch(authPage('u','g')),
   tryCatchAsync(checkResource(User)), 
   tryCatchAsyncEnd(getUserData)  
);

userRouter.get('/accaunts/:id/posts',
   tryCatch(authPage('u','g')),
   tryCatch(checkIsValidQueryParams([
    'limit',
    'count'
  ])),
   tryCatchAsync(checkResource(User)), 
   tryCatchAsyncEnd(getUserPosts)  
);


module.exports = {
    userRouter
}