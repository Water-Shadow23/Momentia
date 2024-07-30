import { useState } from "react";
import { toggleBool } from "../../utils/util.js";



export default function Comment(){
    const [isLiked,setIsLiked] = useState(false);

    return (
        <div className="comment">
        <div className="profile-circle">
          <a href="#" className="showPreviewProfile">
              <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="" /> 
          </a>
        </div>
        <div className="comment-cont">
          <div className="comment-text">
           <a href="#" className="comment-profile-name showPreviewProfile">
             Anonymous__77
           </a>
           <div className="comment-content">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
             Magnam delectus dolor est assumenda saepe suscipit dolore incidunt, 
             mollitia praesentium asperiores veniam, animi minus ipsam nihil. 
             Atque minima repellendus distinctio ad.
           </div>
          </div>
          
          <div className="comment-options">
           <div className="comment-time-ago">
             <p className="comment-option">10m</p>
          </div>
          <div className="comment-likes">
           <p className="comment-option">10 likes</p>
         </div>
          <div className="comment-reply">
           <p className="comment-option">Reply</p>
          </div>
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