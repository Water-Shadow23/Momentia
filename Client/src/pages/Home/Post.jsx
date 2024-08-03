 import { Link } from "react-router-dom"
import { UseOverlay } from "../../hooks/useOverlay.jsx"
import Comments from "../Comments/Comments.jsx";
import CommentForm from "../Comments/CommentForm.jsx";
import PostIcons from "../../components/PostIcons.jsx";
import { overlayConstants } from "../../constants/dispatchConstants.js";
 
 export default function Post(){
    
    const {overlayDispatch} = UseOverlay();
   
    function OpenComment(){
      overlayDispatch({
        typeAction:overlayConstants.OPEN,
        component:Comments,
        typeOverlay:'Modal' 
      });
    }

    return (
      <div className="post">   
  
      <div className="post-options">
         <a href="#" className="profile showPreviewProfile">
            <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/02/luffy-is-grinning-in-the-movie.jpg" alt="" />        
         </a>
         <a href="#" className="profile-name showPreviewProfile">
            <p>spankedhutt</p>
            <span className="time-ago">3d</span>
         </a>
         <div className="three-dots">
            ...
         </div>
      </div>
  
      <div className="main-post-cont">
         <img className="post-image" src="https://picsum.photos/1000/1000?1" alt="" />
      </div>
  
     <PostIcons OpenComment={OpenComment}/>
  
      <div className="post-info">
          <div className="all-likes">
             <p>30,023 likes</p>
          </div>
          <Link  to='' 
          className="all-comments"
          onClick={OpenComment} 
          >
            <p>View all 417 comments</p>
          </Link>
      </div>
      
      <div className="add-comment">
        <CommentForm options={{
         isInitialSubmitBtnHidden:true
        }}/>
      </div>
  
      </div>
    )  
  }

