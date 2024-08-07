import { useContext, useEffect, useState } from "react";
import PostIcons from "../../components/PostIcons.jsx";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
import usePost from "../../hooks/serviceHooks/usePosts.jsx";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import isBadRequest from "../../utils/errorHandler.js";
import usePostDetail from "../../hooks/serviceHooks/usePostDetail.jsx";
import { errorConstants } from "../../constants/dispatchConstants.js";
import { AuthContext } from "../../context/AuthContext.jsx";


export default function Comments(postId,setOuterData){
  
   return function (){
        const {getPostData} = usePost();
        const {getComments} = usePostDetail();
        const {errorDispatch} = useErrorBoundary();

      const [postData,setPostData] = useState();  
      const {authState} = useContext(AuthContext);

      useEffect(()=>{
        (async function(){
            try{
              const postResData = await getPostData(postId);
              const commentsResData = await getComments(postId);
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
            setOuterData.addCommentPlus(postId);
        }
      }

      function addLikeOuter(){
        setPostData((preData)=>{
            preData.likes.push(authState.userId);
            return {...preData} 
          });
          if(setOuterData){
              setOuterData.addLikePlus(postId,authState.userId);
          }
      }

      function removeLikeOuter(){
        setPostData((preData)=>{
            preData.likes = preData.likes.filter(like=>like!==authState.userId);
            return {...preData} 
          });
          if(setOuterData){
              setOuterData.removeLikeMinus(postId,authState.userId);
          }
      }

      function addSaved(){
        setPostData((preData)=>{
            preData.author.saved.push(postId);
            return {...preData} 
          });
      }

      function removeSaved(){
        setPostData((preData)=>{
            preData.author.saved =  preData.author.saved.filter(id=>id!==postId);
            return {...preData} 
          });
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
               <a href="#" className="profile-circle showPreviewProfile">
                   <img src={postData.author?.profilePhoto || ''} alt="" /> 
               </a>
               <a href="#" className="profile-name showPreviewProfile">
                   <p>{postData.author.username}</p>
                </a>
                <div className="three-dots">
                   ...
                </div>
           </div>
           
           <div className="comments">
    
           {postData.comments.map(commentData=>{
            return <Comment data={commentData} key={commentData._id}/>
           })}
             
           </div>
    
           <div className="comments-down">
               
             <PostIcons data={postData} likeActions={{
                addLikeOuter,
                removeLikeOuter
             }} 
             saveActions={{
              addSaved,
              removeSaved
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