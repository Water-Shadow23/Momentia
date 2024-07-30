const {Comment} = require('../models/comment'); 
const { Post } = require('../models/post');
const {dataService} = require('../services/data');

const commentActions = dataService(Comment);
const postActions = dataService(Post);

async function createComment(req,res){
  const resourceId = req.params.id;
  const userId = req.user._id;
  const data = {
   author:userId, 
   ...req.body, 
  };
  const newComment = await commentActions.createRecord(data); 
  
  const post = await postActions.getByIdRaw(resourceId);
   post.comments.push(newComment);
   await post.save();

  res.status(201).json({
    code:201,
    message:"New comment has been successfully created",
    data:newComment
   });
}

async function editComment(req,res){
  const commentId = req.params.comId;
  const data = req.body;
  
  const updatedComment = await commentActions.updateRecordById(commentId,data);

  res.status(200).json({
    code:200,
    message:"The user's comment has been successfully updated",
    data:updatedComment
 });
}

async function deleteComment(req,res){
    const resourceId = req.params.id;
    const commentId = req.params.comId;
     
    await commentActions.deleteRecordById(commentId); 
      
    let comments = await postActions.getByIdProperty(resourceId,"comments");
    comments = comments.filter(id=>id.toString()!==commentId);   
    await postActions.updateRecordById(resourceId,{"comments":comments});

    res.status(200).json({
      code:200,
      message:"The user's comment has been successfully deleted",
   });
}

async function likeComment(req,res){
  const commentId = req.params.comId;
  const userId = req.user._id;

  const data = await commentActions.addLike(commentId,{likes:userId});
  
  res.status(200).json({
    code:200,
    message:"New like has been successfully added to comment",
    data:data
   });
}

async function unlikeComment(req,res){
  const commentId = req.params.comId;
  const userId = req.user._id;

  const data = await commentActions.unLike(commentId,{likes:userId});
  
  res.status(200).json({
    code:200,
    message:"User's like has been successfully deleted from comment",
    data:data
   });
}



module.exports = {
  createComment,
  editComment,
  deleteComment,
  likeComment,
  unlikeComment
}