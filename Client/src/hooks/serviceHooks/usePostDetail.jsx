import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import * as postDetailService from '../../services/postDetailService.js';


export default function usePostDetail(){
    const { authState } = useContext(AuthContext);

    async function createComment(postId,body){
     return postDetailService.createComment({
       authKey:authState.authKey,
       postId,
       body
     });
    }

    async function editComment(postId,commentId,body){
     return postDetailService.editComment({
       authKey:authState.authKey,
       postId,
       commentId,
       body,
     });
    }

    async function terminateComment(postId,commentId){
     return postDetailService.deleteComment({
       authKey:authState.authKey,
       postId,
       commentId
     });
    }

    async function likeComment(postId,commentId){
     return postDetailService.likeComment({
       authKey:authState.authKey,
       postId,
       commentId,
     });
    }

    async function unlikeComment(postId,commentId){
     return postDetailService.unlikeComment({
       authKey:authState.authKey,
       postId,
       commentId
     });
    }
    
    async function getComments(count,limit){
      
    }

    return {
        createComment,
        editComment,
        terminateComment,
        likeComment,
        unlikeComment,
        getComments
    }
}