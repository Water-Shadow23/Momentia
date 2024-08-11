 import { Link, useNavigate } from "react-router-dom"
import { UseOverlay } from "../../hooks/useOverlay.jsx"
import Comments from "../Comments/Comments.jsx";
import CommentForm from "../Comments/CommentForm.jsx";
import PostIcons from "../../components/PostIcons.jsx";
import { overlayConstants } from "../../constants/dispatchConstants.js";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
 
 export default function Post({data}){
    
    const {overlayDispatch} = UseOverlay();
    const {authState} = useContext(AuthContext)
    const navigate = useNavigate();
    const [postState,setPostState] = useState({
      likes:data.likes.length,
      comments:data.comments || 0,
      isLiked:data.likes.includes(authState.userId),
      isSaved:authState.saved.includes(data._id)
    })
   
    function OpenComment(){
      overlayDispatch({
        typeAction:overlayConstants.OPEN,
        component:Comments(data.id,setOuterData(),overlayDispatch),
        typeOverlay:'Modal' 
      });
     history.pushState({},'',`/p/${data.id}`);
    }

    function setOuterData(){
      
      function addOuterLike(){
         setPostState((preData)=>{
           preData.likes = preData.likes + 1;
           preData.isLiked = true;
           return {...preData} 
         });
      }
      function addOuterSave(){
         setPostState((preData)=>{
            preData.isSaved = true;
            return {...preData} 
          });
      }
      function addOuterComment(){
         setPostState((preData)=>{
            preData.comments = preData.comments + 1;
            return {...preData} 
          });
      }
      function removeOuterLike(){
         setPostState((preData)=>{
            preData.likes = preData.likes - 1;
            preData.isLiked = false;
            return {...preData} 
          });
      }

      function removeOuterSave(){
         setPostState((preData)=>{
            preData.isSaved = false;
            return {...preData} 
          });
      }

      return {
         addOuterLike,
         addOuterSave,
         removeOuterSave,
         addOuterComment,
         removeOuterLike
      }
    }
     
    const actions = setOuterData();
    const likeActions = {
      addLikeOuter:actions.addOuterLike,
      removeLikeOuter:actions.removeOuterLike,
      isLiked:postState.isLiked
    }
    const saveActions = {
      addLikeOuter:actions.addOuterSave,
      removeLikeOuter:actions.removeOuterSave,
      isSaved:postState.isSaved
    }

    return (
      <div className="post">   
  
      <div className="post-options">
         <Link to={`/${authState.isAuthenticated ? `u/${data.author.id}` : 'login'}`} className="profile showPreviewProfile">
            <img src={data.author.profilePhoto} alt="" />        
         </Link>
         <Link to={`/${authState.isAuthenticated ? `u/${data.author.id}` : 'login'}`} className="profile-name showPreviewProfile">
            <p>{data.author.username}</p>
            {/* <span className="time-ago">3d</span> */}
         </Link>

         {/* <div className="three-dots">
            ...
         </div> */}

      </div>
  
      <div className="main-post-cont">
         <img className="post-image" src={data.postImage} alt="" />
      </div>
  
     <PostIcons 
     OpenComment={OpenComment} 
     data={data}
     likeActions={likeActions}
     saveActions={saveActions}
     />
  
      <div className="post-info">
          <div className="all-likes">
             <p>{postState.likes} likes</p>
          </div>
          {postState.comments!==0 &&
          <div 
          className="all-comments"
          onClick={()=>{
            if(authState.isAuthenticated){
             OpenComment();
            }else{
             navigate('/login');
            }
          }} 
          >
            <p>View all {postState.comments} comments</p>
          </div>
         }
      </div>
      
      <div className="add-comment">
       {authState.isAuthenticated &&  
        <CommentForm options={{
         isInitialSubmitBtnHidden:true
      }}
      postId={data.id}     
      addPostComment={actions.addOuterComment} 
        />}
      </div>
  
      </div>
    )  
  }

