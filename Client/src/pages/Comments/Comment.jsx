import { useContext, useState } from "react";
import { toggleBool } from "../../utils/util.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import usePostDetail from "../../hooks/serviceHooks/usePostDetail.jsx";



export function Comment({data,likeActions}){
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

    const {likeComment,unlikeComment} = usePostDetail();

    return (
        <div className="comment">
        <div className="profile-circle">
          <a href="#" className="showPreviewProfile">
              <img src={data.author.profilePhoto || ''} alt="" /> 
          </a>
        </div>
        <div className="comment-cont">
          <div className="comment-text">
           <a href="#" className="comment-profile-name showPreviewProfile">
            {data.author.username}
           </a>
           <div className="comment-content">
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
          {/* <div className="comment-reply">
           <p className="comment-option">Reply</p>
          </div> */}
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

export function CommentCaption({data}){

  return (
    <>
      <div className="comment" style={{
        marginBottom:'.8rem'
      }}>
        <div className="profile-circle">
          <a href="#" className="showPreviewProfile">
              <img src={data.author.profilePhoto || ''} alt="" /> 
          </a>
        </div>
        <div className="comment-cont">
          <div className="comment-text">
           <a href="#" className="comment-profile-name showPreviewProfile">
            {data.author.username}
           </a>
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