import { useState } from "react";
import { toggleBool } from "../../utils/util.js";



export default function Comment({data}){
    const [isLiked,setIsLiked] = useState(false);

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
          onClick={()=>{
           setIsLiked(()=>toggleBool(isLiked))
         }}></i>
         </div> 

      </div>
    )
}