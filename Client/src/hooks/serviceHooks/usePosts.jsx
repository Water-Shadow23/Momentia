import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import * as postService from '../../services/postService.js';

export default function usePost(){
    const { authState } = useContext(AuthContext);

   async function getAllPosts(){
    return postService.getAllPosts({
    });
   }

   async function getPostsFromFollowedUsers(){
    return postService.getPostsFromFollowedUsers({
      authKey:authState.authKey,
    });
   }

   async function getPostData(postId){
    return postService.getPostData({
      authKey:authState.authKey,
      postId
    });
   }

   async function createPost(body){
    return postService.createPost({
      authKey:authState.authKey,
      body
    });
   }

   async function terminatePost(postId){
    return postService.deletePost({
      authKey:authState.authKey,
      postId
    });
   }

   async function editPost(postId,body){
    return postService.editPost({
      authKey:authState.authKey,
      postId,
      body
    });
   }

   async function likePost(postId){
    return postService.likePost({
      authKey:authState.authKey,
      postId
    });
   }

   async function unlikePost(postId){
    return postService.unlikePost({
      authKey:authState.authKey,
      postId,
    });
   }

   async function savePost(postId){
    return postService.savePost({
      authKey:authState.authKey,
      postId
    });
   }

   async function unsavePost(postId){
    return postService.unsavePost({
      authKey:authState.authKey,
      postId
    });
   }

  //  async function getLikes(count,limit){

  //  }
   
   return {
    getAllPosts,
    getPostsFromFollowedUsers,
    getPostData,
    createPost,
    editPost,
    terminatePost,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
   }
} 