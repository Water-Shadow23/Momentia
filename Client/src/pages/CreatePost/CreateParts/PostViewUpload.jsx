import PostDetails from "./PostDetails";
import PostFileUpload from "./PostFileUpload.jsx";

 export default function PostViewUpload() {

    return function ViewComponent({
     setCurrentComponent,imageUrl
    }){ 
     return (
         <div className="create-sub-in">
           <div className="create-in" id="modal-cont">
   
             <div className="create-up view-photo">
               <span className="material-symbols-outlined arrow-left"
                onClick={()=>{
                 setCurrentComponent(PostFileUpload) 
                }}
               >
                 arrow_left_alt
               </span>
               <p>View Photo</p>
               <p className="blue" id="next-btn"
                onClick={()=>{
                 setCurrentComponent(PostDetails)
                }}
               >
                 Next
               </p>
             </div>
   
             <div className="create-main view-photo">
               <div className="create-view-cont">
                 <img
                   src={imageUrl}
                   alt=""
                 />
               </div>
   
             </div>
           </div>
         </div>
     );
    } 
   }
   