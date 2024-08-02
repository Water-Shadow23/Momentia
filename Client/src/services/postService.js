import {GetRequest,PostRequest,DeleteRequest,PatchRequest} from './request/RequestMethods.js';
import config from "../configs/envConfig.js";
const env = config();

const baseURL = env.API_BASE_URL;
const basePostURL = env.API_BASE_RECORD_URL;

export async function getAllPosts({
  count = 1,
  limit = 10,

}){
  const url = `${baseURL}${basePostURL}?count=${count}&limit=${limit}`;
  const request = new GetRequest(url);
  
  await request.sendToServer();
}

export async function getPostsFromFollowedUsers({
  authKey,
  count = 1, 
  limit = 10,
}){
 const url = `${baseURL}${basePostURL}/following?count=${count}&limit=${limit}`; 
 const request = new GetRequest(url,null,authKey);
 
 return request.sendToServer();
}

export async function getPostData({
  authKey,  
  postId
}){
 const url = `${baseURL}${basePostURL}/${postId}`;  
 const request = new GetRequest(url,null,authKey);
 
 return request.sendToServer();
}

export async function createPost({
    authKey,
    body  
}){
 const url = `${baseURL}${basePostURL}/create`;
 const request = new PostRequest(url,body,authKey);
 
 return request.sendToServer();     
}

export async function deletePost({
  authKey,
  postId  
}){
 const url = `${baseURL}${basePostURL}/${postId}/delete`;     
 const request = new DeleteRequest(url,null,authKey);
 
 return request.sendToServer();
}

export async function editPost({
  authKey,
  postId,
  body  
}){
 const url = `${baseURL}${basePostURL}/${postId}/edit`;
 const request = new PatchRequest(url,body,authKey);
 
 return request.sendToServer();
}

export async function likePost({
  authKey,
  postId  
}){
 const url = `${baseURL}${basePostURL}/${postId}/like`;   
 const request = new PatchRequest(url,null,authKey);
 
 return request.sendToServer();
}

export async function unlikePost({
  authKey,
  postId  
}){
 const url = `${baseURL}${basePostURL}/${postId}/unlike`;
 const request = new PatchRequest(url,null,authKey);
 
 return request.sendToServer();
}

export async function savePost({
  authKey,
  postId  
}){
 const url = `${baseURL}${basePostURL}/${postId}/save`;  
 const request = new PatchRequest(url,null,authKey);
 
 return request.sendToServer();
}

export async function unsavePost({
  authKey,
  postId  
}){
const url = `${baseURL}${basePostURL}/${postId}/unsave`;
const request = new PatchRequest(url,null,authKey);
 
return request.sendToServer();
}

// export async function getPostLikes({

// }){

// }