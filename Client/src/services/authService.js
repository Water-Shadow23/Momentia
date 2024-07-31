import config from '../configs/envConfig.js';
import {PostRequest} from './request/RequestMethods.js';

const env = config();
const baseURL = env.API_BASE_URL;

async function login(
  {email,password}
){
 const url = `${baseURL}/login`;   
 const request = new PostRequest(url,{
  email,
  password
 });
 
 return request.sendToServer();
}

async function register(
  {email,password,fullName,username}
){
 const url = `${baseURL}/register`; 
 const request = new PostRequest(url,{
  email,
  password,
  fullName,
  username
 });
 
 return request.sendToServer();
}


export {
    login,
    register,
}