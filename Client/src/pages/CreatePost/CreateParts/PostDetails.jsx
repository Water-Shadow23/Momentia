import { useContext } from "react";
import useCharCounter from "../../../hooks/useCharCounter.jsx";
import useForm from "../../../hooks/useForm.jsx";
import PostViewUpload from "./PostViewUpload.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";

 export default function PostDetails() {

    return function DetailsComponent({
      setCurrentComponent,imageUrl,
      setPostData
    }){ 
     const {formData,onFieldChange} = useForm({
       caption:''
     });
     const {authState} = useContext(AuthContext);
     const [chars,charCounter] = useCharCounter();
    
     
     return (
         <div className="create-sub-in-v2">
           <div className="create-in" id="modal-cont">
   
             <div className="create-up view-photo">
               <span className="material-symbols-outlined arrow-left"
                onClick={()=>{
                 setCurrentComponent(PostViewUpload);  
                }}
               >
                 arrow_left_alt
               </span>
               <p>Create new post</p>
               <p className="blue" id="next-btn"
                onClick={()=>{
                  setPostData((preData)=>{
                    const newData = Object.assign({...preData.data},formData);
                    return {
                      data:{
                        ...newData,
                      },
                      isShared:true, 
                    }
                  });
                  
                }}
               >
                 Share
               </p>
             </div>
   
             <div className="create-main view-photo">
               <div className="create-view-cont">
                 <img
                   src={imageUrl}
                   alt=""
                 />
               </div>
   
               <div className="create-settings">
  
                 <div className="create-profile-cont">
                   <div className="profile-photo">
                     <img
                       src={authState.profilePhoto}
                       alt=""
                     />
                   </div>
                   <div className="profile-name">{authState.username}</div>
                 </div>
   
                 <div className="caption">
                   <textarea
                     name="caption"
                     placeholder="Write a caption..."
                     maxLength="2200"
                     onChange={(e)=>{
                      onFieldChange(e);
                      charCounter(e);
                     }}
                     value={formData.caption}
                   ></textarea>
                 </div>
   
                 <div className="char-counter-cont">
                   <div className="char-counter">
                     <p>
                       <span
                       >{chars}</span>/2200
                     </p>
                   </div>
                 </div>
   
   
               </div>
             </div>
           </div>
         </div>
     );
    } 
   }
  