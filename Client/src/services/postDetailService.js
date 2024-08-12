import {PostRequest,PatchRequest,DeleteRequest, GetRequest} from './request/RequestMethods.js'

import config from "../configs/envConfig.js";
const env = config();

const baseURL = env.API_BASE_URL;
const basePostURL = env.API_BASE_RECORD_URL;
const baseCommentUrl = (id)=>{
 return `${baseURL}${basePostURL}/${id}/comments`;
};

export async function createComment({
  postId,
  authKey,
  body  
}){
 const url = `${baseCommentUrl(postId)}/create`;
 const request = new PostRequest(url,body,authKey);

 return request.sendToServer();
}

export async function editComment({
  postId,
  commentId,
  authKey,
  body  
}){
 const url = `${baseCommentUrl(postId)}/${commentId}/edit`;
 const request = new PatchRequest(url,body,authKey);

 return request.sendToServer();
}

export async function deleteComment({
  postId,
  commentId,
  authKey,  
}){
 const url = `${baseCommentUrl(postId)}/${commentId}/delete`;
 const request = new DeleteRequest(url,authKey);

 return request.sendToServer();
}

export async function likeComment({
  postId,
  commentId,
  authKey,  
}){
 const url = `${baseCommentUrl(postId)}/${commentId}/like`;
 const request = new PatchRequest(url,null,authKey);

 return request.sendToServer();
}

export async function unlikeComment({
  postId,
  commentId,
  authKey,  
}){
 const url = `${baseCommentUrl(postId)}/${commentId}/unlike`;
 const request = new DeleteRequest(url,authKey);

 return request.sendToServer();
}

export async function getComments({
 postId,
 authKey,
}){
 const url = `${baseCommentUrl(postId)}`;
 const request = new GetRequest(url,authKey);

 return request.sendToServer();
}