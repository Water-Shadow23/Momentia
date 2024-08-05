const {customAlphabet} = require('nanoid');
const {alphanumeric} = require('nanoid-dictionary');

const { Comment } = require('../models/comment');
const {Post} = require('../models/post');
const {User} = require('../models/user');
const {dataService} = require("../services/data");
const dataPostActions = dataService(Post);
const dataUserActions = dataService(User);


async function createPost(req,res){
  const userId = req.user._id;
  const nanoId = customAlphabet(alphanumeric,15);
  const postId = nanoId();
  
  const postData = {
      author:userId,
      id:postId,
      ...req.body
  }
  const newPost = await dataPostActions.createRecord(postData);

   const user = await dataUserActions.getByIdRaw(userId);
   user.posts.push(newPost);
   await user.save();
  
  res.status(201).json({
   code:201,
   message:"New post has been successfully created",
   data:newPost,
   ok:true
  });
}

async function editPost(req,res){
 const postId = req.params.id;
 const data = req.body;

 const updatedPost = await dataPostActions.updateRecordById(postId,data);

 res.status(200).json({
    code:200,
    message:"The user's post has been successfully updated",
    data:updatedPost,
    ok:true
 });
}

async function deletePost(req,res){
    const postId = req.params.id;
    const userId = req.user._id;

    await dataPostActions.deleteRecordById(postId);  

    let posts = await dataUserActions.getByIdProperty(userId,"posts");
    posts = posts.filter(id=>id.toString()!==postId);   
    await dataUserActions.updateRecordById(userId,{"posts":posts});

    res.status(200).json({
        code:200,
        message:"The user's post has been successfully deleted",
        ok:true
     })
}

async function likePost(req,res){
  const postId = req.params.id;
  const userId = req.user._id;

  const data = await dataPostActions.addLike(postId,{likes:userId});
  
  res.status(200).json({
    code:200,
    message:"New like has been successfully added to post",
    data:data,
    ok:true
   });
}

async function unlikePost(req,res){
    const postId = req.params.id;
    const userId = req.user._id;
  
    const data = await dataPostActions.unLike(postId,{likes:userId});
    
    res.status(200).json({
      code:200,
      message:"User's like has been successfully deleted from post",
      data:data,
      ok:true
     });
}

async function savePost(req,res){
  const postId = req.params.id;
  const userId = req.user._id;
    
  const userData = await dataUserActions.updateRecordAndPushToArray(userId,{saved:postId});

  res.status(200).json({
    code:200,
    message:"The user has successfully saved the post.",
    data:userData,
    ok:true
   });
};

async function unSavePost(req,res){
  const postId = req.params.id;
  const userId = req.user._id;
    
  const userData = await dataUserActions.updateRecordAndPullFromArray(userId,{saved:postId});

  res.status(200).json({
    code:200,
    message:"The user has successfully unsaved the post.",
    data:userData,
    ok:true
   });
}

//future recommendation system->

async function getPostData(req,res){
  const resourceId = req.params.id;

  const postData = await dataPostActions.getById(resourceId);
  
  // await dataPostActions.getByIdAndPopulate(resourceId,
  //   {path:'comments',
  //    model:Comment,
  //    limit:20,
  //    count:1
  //   }
  // );

  res.status(200).json({
    code:200,
    message:"Data retrieved successfully",
    data:postData,
    ok:true
   });
};

async function getAllPosts(req,res){
   const skipValue = (req.query.count-1)*req.query.limit;
   const limitValue = req.query.limit; 

   const chunkData = await dataPostActions.getByChunks({},skipValue,limitValue);
      
   res.status(200).json({
    code:200,
    message:"Data retrieved successfully",
    data:chunkData,
    ok:true
   });
}

async function getPostsFromFollowedUsers(req,res){
   const userData = await dataUserActions.getById(req.user._id); 
   const skipValue = (req.body.count-1)*req.body.limit;
   const limitValue = req.body.limit; 

   const chunkData = await dataPostActions.getByChunks({author:{$in:userData.following}},skipValue,limitValue);
      
   res.status(200).json({
    code:200,
    message:"Data retrieved successfully",
    data:chunkData,
    ok:true
   });
}

async function getPostLikes(req,res){
  const postId = req.params.id;

  const skip = (req.query.count-1)*req.query.limit;
  const limit = req.query.limit;

  const data = await dataPostActions.getByChunks({
   _id:postId 
  },skip,limit);

  res.status(200).json({
    code:200,
    message:"Data retrieved successfully",
    data:data,
    ok:true
   });
}


module.exports = {
    createPost,
    editPost,
    deletePost,
    likePost,
    unlikePost,
    savePost,
    unSavePost,
    getPostData,
    getAllPosts,
    getPostsFromFollowedUsers,
    getPostLikes
}