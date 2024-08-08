import { useContext, useEffect, useRef, useState } from "react";
import PostIcons from "../../components/PostIcons.jsx";
import {Comment, CommentCaption} from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
import usePost from "../../hooks/serviceHooks/usePosts.jsx";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import isBadRequest from "../../utils/errorHandler.js";
import usePostDetail from "../../hooks/serviceHooks/usePostDetail.jsx";
import { errorConstants, overlayConstants } from "../../constants/dispatchConstants.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Comments(postId,setOuterData,overlayDispatch){
    
   return function (){
        const {getPostData} = usePost();
        const {getComments} = usePostDetail();
        const {errorDispatch} = useErrorBoundary();

      const [postData,setPostData] = useState();  
      const {authState} = useContext(AuthContext);
      const isAuthor = useRef(false);

      useEffect(()=>{
        (async function(){
            try{
              const postResData = await getPostData(postId);
              const commentsResData = await getComments(postId);
              isAuthor.current = postResData.data.author._id === authState.userId;
              setPostData(()=>({
                ...postResData.data,
                comments:commentsResData.data
            }));
            }catch(err){
             if(!isBadRequest(err)){
               errorDispatch({
                   typeAction:errorConstants.SET_ERROR,
                   error:err
                 });
             }
            }
          })()
      },[]) 
      

      function addComment(comment){
        setPostData((preData)=>{
          preData.comments.push(comment);
          return {...preData} 
        });
        if(setOuterData){
            setOuterData.addOuterComment(postId);
        }
      }

      function addLikeOuter(){
        setPostData((preData)=>{
            preData.likes.push(authState.userId);
            return {...preData} 
          });
          if(setOuterData){
              setOuterData.addOuterLike(postId,authState.userId);
          }
      }
      function addCommentLike(comId){
        setPostData((preData)=>{
         const comment =  preData.comments.find(com=>com._id===comId);
         comment.likes.push(authState.userId);
         return {...preData} 
         } 
        )
      }  
      function removeCommentLike(comId){
        setPostData((preData)=>{
          const comment =  preData.comments.find(com=>com._id===comId);
          comment.likes = comment.likes.filter(like=>like!==authState.userId);
          return {...preData} 
        });
      }

      function removeLikeOuter(){
        setPostData((preData)=>{
            preData.likes = preData.likes.filter(like=>like!==authState.userId);
            return {...preData} 
          });
          if(setOuterData){
              setOuterData.removeOuterLike(postId,authState.userId);
          }
      }

           
      return (
        <>
       {postData ? 
       <div className="comments-cont" >
         <div className="comments-in" id="modal-cont">
    
       <div className="comments-img-cont">
           <img className="comments-img" src={postData.postImage} alt="" />
       </div>
       <div className="comments-sub-cont">
           <div className="author-cont">
               <Link to={isAuthor.current ? '/accaunts' : `/u/${postData.author.id}` }
               className="profile-circle showPreviewProfile"
               onClick={()=>{
                overlayDispatch({
                  typeAction:overlayConstants.CLOSE
                })
              }}
               >
                   <img src={postData.author?.profilePhoto || ''} alt="" /> 
               </Link>
               <Link to={isAuthor.current ? '/accaunts' : `/u/${postData.author.id}` } 
               className="profile-name showPreviewProfile"
               onClick={()=>{
                overlayDispatch({
                  typeAction:overlayConstants.CLOSE
                })
              }}
               >
                   <p>{postData.author.username}</p>
                </Link>
                <div className="three-dots">
                   ...
                </div>
           </div>
           
           <div className="comments">
           {postData.caption && 
           <CommentCaption data={{
            author:postData.author,
            caption:postData.caption
           }} 
           overlayDispatch={overlayDispatch}
           /> 
           }
           {postData.comments.map(commentData=>{
            return <Comment data={commentData}  key={commentData._id}
            likeActions={{
              addCommentLike,
              removeCommentLike,
            }}
            overlayDispatch={overlayDispatch}
            />
           })}
             
           </div>
    
           <div className="comments-down">
               
             <PostIcons data={postData} likeActions={{
                addLikeOuter,
                removeLikeOuter
             }}
             saveActions={{
              removeOuterSave:setOuterData?.removeOuterSave
             }}
             />
    
               <div className="stats">
                   <div className="all-likes">
                       <p>{postData.likes.length} likes</p>
                   </div>
                   {/* <div className="time-ago">
                       <p>10 minutes ago</p>
                   </div> */}
               </div>
    
               <div className="add-comment">
                   <CommentForm addComment={addComment} postId={postId}/>
               </div>
    
           </div>
         </div>
         
       </div>
       
    </div> 
    : 
    ''}
    </>
      ) 
  }  

}