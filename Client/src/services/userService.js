import {PatchRequest,GetRequest,DeleteRequest} from './request/RequestMethods.js'
import config from "../configs/envConfig.js";
const env = config();

const baseURL = env.API_BASE_URL;
const baseUserURL = env.API_BASE_USER_URL;

export async function getAccauntOwnPosts({
 authKey
}){
 const url = `${baseURL}${baseUserURL}/posts`;
 const request = new GetRequest(url,authKey);

 return request.sendToServer();
}

export async function getAccauntSavedPosts({
 authKey
}){
 const url = `${baseURL}${baseUserURL}/saved`;
 const request = new GetRequest(url,authKey);

 return request.sendToServer();
}

export async function getAccauntData({
 authKey
}){
 const url = `${baseURL}${baseUserURL}`;
 const request = new GetRequest(url,authKey);

 return request.sendToServer();
}

export async function editAccaunt({
 authKey,
 body
}){
 const url = `${baseURL}${baseUserURL}/edit`; 
 const request = new PatchRequest(url,body,authKey);

 return request.sendToServer();
}

export async function deleteAccaunt({
 authKey
}){
 const url = `${baseURL}${baseUserURL}/delete`;
 const request = new DeleteRequest(url,authKey);

 return request.sendToServer();
}

export async function followUser({
  userId,
  authKey
}){
 const url = `${baseURL}${baseUserURL}/${userId}/follow`;
 const request = new PatchRequest(url,null,authKey);

 return request.sendToServer();
}

export async function unfollowUser({
  userId,
  authKey
}){
 const url = `${baseURL}${baseUserURL}/${userId}/unfollow`;
 const request = new PatchRequest(url,null,authKey);

 return request.sendToServer();
}
