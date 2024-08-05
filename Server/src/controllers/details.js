const {Comment} = require('../models/comment'); 
const {dataService} = require('../services/data');

const commentActions = dataService(Comment);

async function createComment(req,res){
  const resourceId = req.params.id;
  const userId = req.user._id;
  const data = {
   author:userId,
   post:resourceId, 
   ...req.body, 
  };
  const newComment = await commentActions.createRecord(data); 
  
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

 const skip = (req.query.count-1)*req.query.limit;
 const limit = req.query.limit;
 
 const data = await commentActions.getByChunks({
  post:postId
 },skip,limit);

 res.status(200).json({
  code:200,
  message:"Data retrieved successfully",
  data:data,
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