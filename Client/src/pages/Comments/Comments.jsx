import PostIcons from "../../components/PostIcons.jsx";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";


export default function Comments(){

   return (
    <div className="comments-cont" >
      <div className="comments-in" id="modal-cont">

    <div className="comments-img-cont">
        <img className="comments-img" src="https://picsum.photos/1000/1000?1" alt="" />
    </div>
    <div className="comments-sub-cont">
        <div className="author-cont">
            <a href="#" className="profile-circle showPreviewProfile">
                <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/02/luffy-is-grinning-in-the-movie.jpg" alt="" /> 
            </a>
            <a href="#" className="profile-name showPreviewProfile">
                <p>spankedhutt</p>
             </a>
             <div className="three-dots">
                ...
             </div>
        </div>
        
        <div className="comments">

        <Comment />
          
        </div>

        <div className="comments-down">
            
          <PostIcons />

            <div className="stats">
                <div className="all-likes">
                    <p>6,634 likes</p>
                </div>
                <div className="time-ago">
                    <p>10 minutes ago</p>
                </div>
            </div>

            <div className="add-comment">
                <CommentForm />
            </div>

        </div>
      </div>
      
    </div>
    
 </div>
   ) 
}