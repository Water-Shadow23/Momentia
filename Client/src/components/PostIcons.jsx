import { useContext, useState } from "react";
import { toggleBool } from "../utils/util.js";
import usePost from "../hooks/serviceHooks/usePosts.jsx";
import isBadRequest from "../utils/errorHandler.js";
import useErrorBoundary from "../hooks/UseErrorBoundary.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { authConstants, errorConstants } from "../constants/dispatchConstants.js";



export default function PostIcons({OpenComment,likeActions,saveActions,data}){
    const {authState} = useContext(AuthContext);
    const {errorDispatch} = useErrorBoundary();
    const [isLiked,setIsLiked] = useState(()=>{
      const WeLiked = data.likes.includes(authState.userId);
      if(WeLiked){
       return true;
      }else{
        return false;
      } 
    });
    const [isSaved,setIsSaved] = useState(()=>{
      const WeSaved = authState.saved.includes(data._id);
      if(WeSaved){
       return true;
      }else{
        return false;
      } 
    });

    const {likePost,savePost,unlikePost,unsavePost} = usePost();

    return (
        <div className="icons-post-cont">
  
        <div className="icon-cont" 
        onClick={async ()=>{
           try{
            if(!isLiked){
             await likePost(data._id);
             likeActions.addLikeOuter();
             setIsLiked(true);
            }else{
              await unlikePost(data._id);
              likeActions.removeLikeOuter();
              setIsLiked(false);
            }

           }catch(err){
             
           }
        }}
        >
          <i className={`fa-regular fa-heart icon icon-post ${isLiked && 'liked'}`}></i>
        </div>
        <div className="icon-cont" 
        onClick={OpenComment}
        >
          <i className="fa-regular fa-comment icon icon-post"></i>
        </div>
        <div className="icon-cont" onClick={async ()=>{
           try{
            if(!isSaved){

              await savePost(data._id);
              authState.saved.push(data._id);
              setIsSaved(true);
             }else{
               await unsavePost(data._id);
               if(saveActions.removeOuterSave){
                saveActions.removeOuterSave(data._id);
               }
               authState.saved = authState.saved.filter(id=>id!==data._id)
               setIsSaved(false);
             }
           }catch(err){
           
           }
        }}

        >
          <i className={`fa-regular fa-bookmark icon icon-post  
          ${isSaved && 'saved'}`}></i>
        </div>
  
       </div>
    )
}