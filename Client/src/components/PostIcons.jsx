import { useContext, useEffect, useState } from "react";
import usePost from "../hooks/serviceHooks/usePosts.jsx";
import isBadRequest from "../utils/errorHandler.js";
import useErrorBoundary from "../hooks/UseErrorBoundary.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { authConstants, errorConstants, postIconsConstants } from "../constants/dispatchConstants.js";
import { useNavigate } from "react-router-dom";



export default function PostIcons({OpenComment,
  outerActions,postId,iconsUpperState,
  postIconsContext,isOverlay
}){
     

    const {authState} = useContext(AuthContext);
    const {errorDispatch} = useErrorBoundary();
    const navigate = useNavigate();
    
    
    const {likePost,savePost,unlikePost,unsavePost} = usePost();
    let isLiked;
    let isSaved;
    
    if(postIconsContext){
      isLiked = (!isOverlay && postIconsContext.postIconsState.isLiked) 
     || ((isOverlay && iconsUpperState.iconsState.isLiked) ) 
    
      isSaved =  (!isOverlay && postIconsContext.postIconsState.isSaved) 
     || ((isOverlay && iconsUpperState.iconsState.isSaved) ) 
    }else{
      isLiked = iconsUpperState.iconsState.isLiked
      isSaved = iconsUpperState.iconsState.isSaved
    }
    
    return (
        <div className="icons-post-cont">
  
        <div className="icon-cont" 
        onClick={async ()=>{
          if(authState.isAuthenticated){
            try{
             if(!isLiked){
              await likePost(postId);
              if(postIconsContext){
                postIconsContext.postIconsDispatch({
                  typeAction:postIconsConstants.LIKE
                })
              }
              if(iconsUpperState){
                iconsUpperState.setIconsState(preState=>{
                   preState.isLiked = true;
                   return {...preState}
                 }) 
               }
              outerActions.addOuterLike(authState.userId);
             }else{
               await unlikePost(postId);
               if(postIconsContext){
                 postIconsContext.postIconsDispatch({
                  typeAction:postIconsConstants.UNLIKE
                })
               }
              if(iconsUpperState){
                iconsUpperState.setIconsState(preState=>{
                   preState.isLiked = false;
                   return {...preState}
                 }) 
               }
               outerActions.removeOuterLike(authState.userId);
             }
 
            }catch(err){
              
            }
          }else{
           navigate('/login');
          }
        }}
        >
          <i className={`fa-regular fa-heart icon icon-post 
          ${isLiked && 'liked'}`}></i>

        </div>
        <div className="icon-cont" 
        onClick={()=>{
          if(authState.isAuthenticated){
           OpenComment(); 
          }
          else{
            navigate('/login')
          } 
        }}
        >
          <i className="fa-regular fa-comment icon icon-post"></i>
        </div>
        <div className="icon-cont" 

        >
          <i onClick={async ()=>{
          if(authState.isAuthenticated){
           try{
            if(!isSaved){

              await savePost(postId);
              authState.saved.push(postId);
               if(iconsUpperState){
                iconsUpperState.setIconsState(preState=>{
                   preState.isSaved = true;
                   return {...preState}
                 }) 
               }
              if(postIconsContext){
                postIconsContext.postIconsDispatch({
                  typeAction:postIconsConstants.SAVE
                })
              } 
              
             }else{
               await unsavePost(postId);     
               authState.saved = authState.saved.filter(id=>id!==postId)
               if(iconsUpperState){
                iconsUpperState.setIconsState(preState=>{
                   preState.isSaved = false;
                   return {...preState}
                 }) 
                }
                if(postIconsContext){
                  postIconsContext.postIconsDispatch({
                    typeAction:postIconsConstants.UNSAVE
                  })
                }
              
                  outerActions.removeOuterSave()
                
             }
           }catch(err){
           
           }
          }else{
            navigate('/login');
          }
        }} 
          className={`fa-regular fa-bookmark icon icon-post  
          ${isSaved && 'saved'}`}></i>
        </div>
  
       </div>
    )
}