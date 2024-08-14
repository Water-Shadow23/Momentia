import {  useContext, useEffect, useRef, useState } from "react";
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
import { OuterBuilder } from "../../utils/Outer.jsx";

    
   export default function Comments (postId,outerActions,postIconsContext){

     return function({overlayDispatch,isOpen}){

        const {getPostData} = usePost();
        const {getComments} = usePostDetail();
        // const {errorDispatch} = useErrorBoundary();

      const [postData,setPostData] = useState();  
      const {authState} = useContext(AuthContext);
      const isAuthor = useRef(false);

      const [iconsState,setIconsState] = useState();
      

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
            setIconsState(()=>{
              const isLiked =   postResData.data.likes.includes(authState.userId);
              const isSaved = authState.saved.includes(postResData.data._id);
              
             
                return {
                  isLiked,
                  isSaved
                }
            })
            }catch(err){
             if(!isBadRequest(err)){
              //  errorDispatch({
              //      typeAction:errorConstants.SET_ERROR,
              //      error:err
              //    });
             }
            }
          })()
      },[]) 
      
      const outerPostActions = OuterBuilder(setPostData)

      
      function addLike(){
        outerPostActions.addOuterLike(authState.userId);
        if(outerActions){
          outerActions.addOuterLike(authState.userId);
        }
        }
      function removeLike(){
          outerPostActions.removeOuterLike(authState.userId);
          if(outerActions){
            outerActions.removeOuterLike(authState.userId);
          }
      }

      function removeSave(){
        if(outerActions.removeOuterSave){
          if(outerActions.removeOuterSave.length){
            outerActions.removeOuterSave(postId);
          }
        }
      }
        

      function addComment(comment){
          setPostData((preData)=>{
            preData.comments.push(comment);
            return {...preData} 
          });
          if(outerActions){
            outerActions.addOuterComment();
          }
          
      }
      function removeComment(comId){
        setPostData((preData)=>{
          preData.comments = preData.comments.filter(com=>com._id!==comId);
          return {...preData} 
        });
        if(outerActions){
          outerActions.removeOuterComment();
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

      function editComment(comId,newContent){
        setPostData((preData)=>{
          const comment = preData.comments.find(com=>com._id===comId);
          comment.content = newContent;
        
          return {...preData} 
        });
      }

      
      const commentFormRef = useRef(null);
      
      return (
        <>
       {postData ? 
       <div className="comments-cont" >
         <div className="comments-in" id={overlayDispatch ? 'modal-cont' : ''} data-navigate={-1}>
    
       <div className="comments-img-cont">
           <img className="comments-img" src={postData.postImage} alt="" />
       </div>
       <div className="comments-sub-cont">
           <div className="author-cont">
               <Link to={isAuthor.current ? '/accaunts' : `/u/${postData.author.id}` }
               className="profile-circle showPreviewProfile"
               onClick={()=>{
               if(overlayDispatch){
                 overlayDispatch({
                   typeAction:overlayConstants.CLOSE
                 })
               } 
              }}
               >
                   <img src={postData.author?.profilePhoto || ''} alt="" /> 
               </Link>
               <Link to={isAuthor.current ? '/accaunts' : `/u/${postData.author.id}` } 
               className="profile-name showPreviewProfile"
               onClick={()=>{
                if(overlayDispatch){
                  overlayDispatch({
                    typeAction:overlayConstants.CLOSE
                  })
                }
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
           type={isOpen && 'overlay'}
           /> 
           }
           {postData.comments.map(commentData=>{
            return <Comment data={commentData}  key={commentData._id}
            likeActions={{
              addCommentLike,
              removeCommentLike,
            }}
            commentActions={{
              removeComment,
              editComment
            }}
            overlayDispatch={overlayDispatch}
            type={isOpen && 'overlay'}
            commentFormRef={commentFormRef}
            />
           })}
             
           </div>
    
           <div className="comments-down">
               
             <PostIcons outerActions={{
                addOuterLike:addLike,
                removeOuterLike:removeLike,
                removeOuterSave:removeSave,
             }}
             postId={postData._id}
             postIconsContext={postIconsContext}
             iconsUpperState={{iconsState,setIconsState}}
             isOverlay={true}
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
                   <CommentForm 
                   addComment={addComment}
                   editComment={editComment} 
                   postId={postData.id} 
                   ref={commentFormRef}
                   />
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

