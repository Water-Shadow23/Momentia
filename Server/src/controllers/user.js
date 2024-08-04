const { Post } = require("../models/post");
const {User} = require("../models/user");
const {dataService} = require('../services/data');

const userActions = dataService(User);

async function editProfile(req,res){
     const id = req.user._id;
     const updateData = req.body;
     const updatedData = await userActions.updateRecordById(id,updateData); 
    res.status(200).json({
        code:200,
        message:"The user's account has been successfully updated",
        data:updatedData
    });
};

async function deleteProfile(req,res){
   const id = req.user._id;
   await userActions.deleteRecordById(id);
   res.status(200).json({
    code:200,
    message:"The user's account has been successfully deleted"
   });
};

async function followProfile(req,res){
  const userId = req.user._id;
  const operationUserId = req.params.id;

  await userActions.follow(operationUserId,{followers:userId});
  const updatedData =  await userActions.follow(userId,{following:operationUserId});

 res.status(200).json({
    code:200,
    message:"The user account has been successfully followed",
    data:updatedData
});
}

async function unfollowProfile(req,res){
    const userId = req.user._id;
    const operationUserId = req.params.id;
  
    await userActions.unfollow(operationUserId,{followers:userId});
    const updatedData =  await userActions.unfollow(userId,{following:operationUserId});
  
   res.status(200).json({
      code:200,
      message:"The user account has been successfully unfollowed",
      data:updatedData
  });
}


async function getProfileSavedPost(req,res){
  const userId = req.user._id;
  const userData =  await userActions.getByIdAndPopulate(userId,
    {
        path:'saved',
        model:Post,
        limit:req.query.limit,
        count:req.query.count   
    }
);

  res.status(200).json({
    code:200,
    message:"Data retrieved successfully",
    data:{saved:userData['saved']},
});
}
async function getProfilePosts(req,res){
    const userId = req.user._id;
    const userData =  await userActions.getByIdAndPopulate(userId,
        {
            path:'posts',
            model:Post,
            limit:req.query.limit,
            count:req.query.count   
        }
    );
  
    res.status(200).json({
      code:200,
      message:"Data retrieved successfully",
      data:{posts:userData.posts},
  });
}
async function getProfileData(req,res){
    const userId = req.user._id;
    const userData =  await userActions.getByIdAndPopulate(userId,
        {
        path:'posts',
        model:Post,
        limit:10,
        count:1
        }
    );

    res.status(200).json({
        code:200,
        message:"Data retrieved successfully",
        data:userData,
    });
}


async function getUserData(req,res){
    const userId = req.params.id;
    const userData =  await userActions.getByIdAndPopulate(userId,
        {
        path:'posts',
        model:Post,
        limit:10,
        count:1
        }
    );

    res.status(200).json({
        code:200,
        message:"Data retrieved successfully",
        data:{
          id:userData.id, 
          username:userData.username,
          fullName:userData.fullName,
          email:userData.email,
          posts:userData.posts,
          followers:userData.followers, 
          following:userData.following, 
          gender:userData.gender, 
        },
    });
}

async function getUserPosts(req,res){
    const userId = req.params.id;
    const userData =  await userActions.getByIdAndPopulate(userId,
        {
            path:'posts',
            model:Post,
            limit:req.query.limit,
            count:req.query.count   
        }
    );
  
    res.status(200).json({
      code:200,
      message:"Data retrieved successfully",
      data:{posts:userData.posts},
  });
}

module.exports = {
    editProfile,
    deleteProfile,
    followProfile,
    unfollowProfile,
    getProfileSavedPost,
    getProfilePosts,
    getProfileData,
    getUserData,
    getUserPosts
} 
