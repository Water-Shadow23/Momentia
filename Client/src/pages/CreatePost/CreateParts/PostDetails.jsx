import useCharCounter from "../../../hooks/useCharCounter.jsx";
import useForm from "../../../hooks/useForm.jsx";
import PostViewUpload from "./PostViewUpload.jsx";

 export default function PostDetails() {

    return function DetailsComponent({
      setCurrentComponent,imageUrl,
      setPostData
    }){ 
     const {formData,onFieldChange} = useForm({
       caption:''
     });
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
                       src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d733c1e1-d7d1-4f92-9abb-628b1aa5af6a/dfzlns7-c3089e5b-f230-4a67-b56a-706f105c6bed.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MzNjMWUxLWQ3ZDEtNGY5Mi05YWJiLTYyOGIxYWE1YWY2YVwvZGZ6bG5zNy1jMzA4OWU1Yi1mMjMwLTRhNjctYjU2YS03MDZmMTA1YzZiZWQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GER60TdONmCscZ3QvsDf0bVQRk9bsnhdB7FB9RviXK0"
                       alt=""
                     />
                   </div>
                   <div className="profile-name">g_manov_</div>
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
  