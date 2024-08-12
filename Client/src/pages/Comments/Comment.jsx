import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import usePostDetail from "../../hooks/serviceHooks/usePostDetail.jsx";
import { Link, useNavigate } from "react-router-dom";
import { overlayConstants } from "../../constants/dispatchConstants.js";



export function Comment({data,likeActions,commentActions,overlayDispatch,type}){
    const {authState} = useContext(AuthContext);

    const [isLiked,setIsLiked] = useState(()=>{
       const WeLiked =  data.likes.includes(authState.userId);
       if(WeLiked){
         return true;  
       }
       else{
        return false;
       }
    });
    
    const isAuthor = data.author._id === authState.userId;
    const {terminateComment} = usePostDetail();
    
    const {likeComment,unlikeComment} = usePostDetail();
    const navigate = useNavigate();
    
    
    return (
        <div className="comment">
         <div className="comment-in-cont">
        <div className="profile-circle">
          <Link to={isAuthor ? '/accaunts' : `/u/${data.author.id}` } 
          className="showPreviewProfile"
          onClick={()=>{
            if(type==='overlay'){
            overlayDispatch({
              typeAction:overlayConstants.CLOSE
            })
          }
          }}
          >
              <img src={data.author.profilePhoto || ''} alt="" /> 
          </Link>
        </div>
        <div className="comment-cont">
          <div className="comment-text">
           <Link to={isAuthor ? '/accaunts' : `/u/${data.author.id}` } 
           className="comment-profile-name showPreviewProfile"
           onClick={()=>{
            if(type==='overlay'){
              overlayDispatch({
                typeAction:overlayConstants.CLOSE
              })
            } 
          }}
           >
            {data.author
            .username}
           </Link>
           <div className="comment-content" >
             {data.content}
           </div>

          </div>
          
          <div className="comment-options">
           {/* <div className="comment-time-ago">
             <p className="comment-option">10m</p>
          </div> */}
          <div className="comment-likes">
           <p className="comment-option">{data.likes.length} likes</p>
         </div>
          {isAuthor &&
          <>
          <div className="comment-edit"
          onClick={async ()=>{
          
          }}
          >
           <p className="comment-option">edit</p>
          </div>
          <div className="comment-delete" 
          onClick={async ()=>{
           try{
            commentActions.removeComment(data._id);
           await terminateComment(data.post,data._id);
          
           }catch(err){
            console.error(err);
           }
          }}
          >
           <p className="comment-option">delete</p>
          </div>
          </>
          }
          {/* <div className="comment-reply">
           <p className="comment-option">Reply</p>
          </div> */}
          </div>
        </div>    
          </div> 

         <div className="comment-like">
          <i 
          className={`fa-regular fa-heart ${isLiked && 'liked'}`} 
          onClick={async ()=>{
           try{
             if(!isLiked){
              await likeComment(data.post,data._id);  
              likeActions.addCommentLike(data._id);   
              setIsLiked(true);
             }else{
              await unlikeComment(data.post,data._id);
              likeActions.removeCommentLike(data._id);
              setIsLiked(false);
             }
           }catch(err){

           }
         }}></i>
         </div> 

      </div>
    )
}

export function CommentCaption({data,overlayDispatch,type}){
  const {authState} = useContext(AuthContext);
  
  const isAuthor = data.author._id === authState.userId;

  return (
    <>
      <div className="comment" style={{
        marginBottom:'.8rem'
      }}>
        <div className="profile-circle">
          <Link to={isAuthor ? '/accaunts' : `/u/${data.author.id}` } 
          className="showPreviewProfile"
          onClick={()=>{
            if(type==='overlay'){
            overlayDispatch({
              typeAction:overlayConstants.CLOSE
            })
          }
          }}
          >
              <img src={data.author.profilePhoto || ''} alt="" /> 
          </Link>
        </div>
        <div className="comment-cont">
          <div className="comment-text">
           <Link to={isAuthor ? '/accaunts' : `/u/${data.author.id}` }
           className="comment-profile-name showPreviewProfile"
           onClick={()=>{
            if(type==='overlay'){
            overlayDispatch({
              typeAction:overlayConstants.CLOSE
            })
          }
          }}   
           >
            {data.author.username}
           </Link>
           <div className="comment-content" style={{
            whiteSpace:'pre-wrap'
           }}>
             {data.caption}
           </div>
          </div>
          
          <div className="comment-options">
           {/* <div className="comment-time-ago">
             <p className="comment-option">10m</p>
          </div> */}
        
          </div>
        </div>


      </div>
    </>
  )
}