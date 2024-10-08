 import { Link, useNavigate } from "react-router-dom"
import { UseOverlay } from "../../hooks/useOverlay.jsx"
import Comments from "../Comments/Comments.jsx";
import CommentForm from "../Comments/CommentForm.jsx";
import PostIcons from "../../components/PostIcons.jsx";
import { overlayConstants, postIconsConstants } from "../../constants/dispatchConstants.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { OuterBuilder } from "../../utils/Outer.jsx";
import { PostIconsContext } from "../../context/PostIconsContext.jsx";
 
 export default function Post({data}){
    
    const {overlayDispatch} = UseOverlay();
    const {postIconsState,postIconsDispatch} = useContext(PostIconsContext);
    const {authState} = useContext(AuthContext)
    const navigate = useNavigate();

    const [postState,setPostState] = useState({
      likes:data.likes,
      comments:data.comments || 0
    })
    
    useEffect(()=>{
     postIconsDispatch({
      typeAction:'setState',
      data:{
         isLiked:data.likes.includes(authState.userId),
         isSaved:authState.saved.includes(data._id)
      }
      });
   },[]);
    
    
    const OuterActions = OuterBuilder(setPostState);
    delete OuterActions.removeOuterSave
   
    function OpenComment(){
      overlayDispatch({
        typeAction:overlayConstants.OPEN,
        component:(Comments(
         data.id,
         OuterActions,
         {postIconsState,postIconsDispatch}
       )),
        typeOverlay:'Modal' 
      });
     history.pushState({},'',`/p/${data.id}`);
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
     outerActions={OuterActions}
     postId={data._id}
     postIconsContext={{postIconsState,postIconsDispatch}}
     isOverlay={false}
     />
  
      <div className="post-info">
          <div className="all-likes">
             <p>{postState.likes.length} likes</p>
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
      addOuterComment={OuterActions.addOuterComment} 
        />}
      </div>
  
      </div>
    )  
  }

