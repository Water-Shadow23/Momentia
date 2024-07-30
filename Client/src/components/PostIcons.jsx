import { useState } from "react";
import { toggleBool } from "../utils/util.js";



export default function PostIcons({OpenComment}){
    const [isLiked,setIsLiked] = useState(false);
    const [isSaved,setIsSaved] = useState(false);

    return (
        <div className="icons-post-cont">
  
        <div className="icon-cont" 
        onClick={()=>{
           setIsLiked(()=>toggleBool(isLiked));
        }}
        >
          <i className={`fa-regular fa-heart icon icon-post ${isLiked && 'liked'}`}></i>
        </div>
        <div className="icon-cont" 
        onClick={OpenComment}
        >
          <i className="fa-regular fa-comment icon icon-post"></i>
        </div>
        <div className="icon-cont" onClick={()=>{
            setIsSaved(()=>toggleBool(isSaved));
        }}

        >
          <i className={`fa-regular fa-bookmark icon icon-post ${isSaved && 'saved'}`}></i>
        </div>
  
       </div>
    )
}