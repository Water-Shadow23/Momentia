const {Comment} = require('../models/comment'); 
const { Post } = require('../models/post');
const { User } = require('../models/user');
const {dataService} = require('../services/data');

const commentActions = dataService(Comment);
const postActions = dataService(Post);

async function createComment(req,res){
  const resourceId = req.params.id;
  const userId = req.user._id;
  const data = {
   author:userId,
   post:resourceId, 
   ...req.body, 
  };
  const newComment = await commentActions.createRecordAndPopulate(data,{
    path:'author',
    model:User
  });

  newComment.author = {
    _id:newComment.author._id,
    id:newComment.author.id,
    username:newComment.author.username,
    profilePhoto:newComment.author.profilePhoto || '',
  }

  const post = await postActions.getByCustomRaw({id:resourceId});
  post.comments = post.comments + 1;
  await post.save();
  
  res.status(201).json({
    code:201,
    message:"New comment has been successfully created",
    data:newComment,
    ok:true
   });
}

async function editComment(req,res){
  const commentId = req.params.comId;
  const data = req.body;
  
  const updatedComment = await commentActions.updateRecordById(commentId,data);

  res.status(200).json({
    code:200,
    message:"The user's comment has been successfully updated",
    data:updatedComment,
    ok:true
 });
}

async function deleteComment(req,res){
    const resourceId = req.params.id;
    const commentId = req.params.comId;
     
    await commentActions.deleteRecordById(commentId); 
    const post = await postActions.getByIdRaw(resourceId);
    post.comments = post.comments - 1;
    await post.save();
    
    res.status(200).json({
      code:200,
      message:"The user's comment has been successfully deleted",
      ok:true
   });
}

async function likeComment(req,res){
  const commentId = req.params.comId;
  const userId = req.user._id;

  const data = await commentActions.addLike(commentId,{likes:userId});
  
  res.status(200).json({
    code:200,
    message:"New like has been successfully added to comment",
    data:data,
    ok:true
   });
}

async function unlikeComment(req,res){
  const commentId = req.params.comId;
  const userId = req.user._id;

  const data = await commentActions.unLike(commentId,{likes:userId});
  
  res.status(200).json({
    code:200,
    message:"User's like has been successfully deleted from comment",
    data:data,
    ok:true
   });
}

async function getComments(req,res){
 const postId = req.params.id;

//  const skip = (req.query.count-1)*req.query.limit;
//  const limit = req.query.limit;
 
 const commentsData = await commentActions.getManyByCustomAndPopulate({
  post:postId
 },{
  path:'author',
  model:User
 });
 
 if(commentsData.length){
  for(let comment of commentsData){
    comment.author = {
     _id:comment.author._id,
     id:comment.author.id,
     username:comment.author.username,
     profilePhoto:comment.author.profilePhoto || '',
   }
  }
 }

 res.status(200).json({
  code:200,
  message:"Data retrieved successfully",
  data:commentsData || [],
  ok:true
 });
}

module.exports = {
  createComment,
  editComment,
  deleteComment,
  likeComment,
  unlikeComment,
  getComments,
}