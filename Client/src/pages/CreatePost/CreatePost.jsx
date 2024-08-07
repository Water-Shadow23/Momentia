import { useEffect, useState } from "react";
import useImageUpload from "../../hooks/useImageUpload.jsx";
import PostFileUpload from "./CreateParts/PostFileUpload.jsx";
import PostViewUpload from "./CreateParts/PostViewUpload.jsx";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import isBadRequest from "../../utils/errorHandler.js";
import { errorConstants, overlayConstants } from "../../constants/dispatchConstants.js";
import usePost from "../../hooks/serviceHooks/usePosts.jsx";
import { useNavigate } from "react-router-dom";
import { UseOverlay } from "../../hooks/useOverlay.jsx";


export default function CreatePost({overlayDispatch}) {
  const [postData,setPostData] = useState({
    data:{
      postImage:'',
      caption:'', 
    },
    isShared:false,
  });
  const [isFileOver,setFileOver] = useState(false);
  const errorDispatch = useErrorBoundary();
  const navigate = useNavigate();

  const [CurrentComponent,setCurrentComponent] = useState(PostFileUpload);
  //
  const [imagePreviewUrl,setImageUploadState,processFile] = useImageUpload()
  
  async function handleImage(e,nextCurrentComponent){
      if(CurrentComponent.name === 'UploadComponent') {
      const [imageUrl] = await processFile(e);
      setFileOver(false); 
      setImageUploadState(setPostData,{
        toProp:'postImage',
        data:{
          imageUrl:imageUrl
        }
      });
      setCurrentComponent(nextCurrentComponent); 
    }
  }
  
  
  const {createPost} = usePost();

  useEffect(()=>{
   if(postData.isShared){
     (async function(){
       try{
        await createPost(postData.data);
        overlayDispatch({
          typeAction:overlayConstants.CLOSE
        })
        navigate('/explore'); 
       }catch(err){
         if(!isBadRequest(err)){
           errorDispatch({
               typeAction:errorConstants.SET_ERROR,
               error:err
             });
         }
       }
     })()
   } 
  },[postData.isShared])
  
  return (
    <div className="create-sub"
    onDragOver={onDragFileOver}
    onDragLeave={onDragFileLeave}
    onDrop={(e)=>{
      handleImage(e,PostViewUpload)
    }}

    >
     <CurrentComponent setCurrentComponent={setCurrentComponent}
                       setPostData={setPostData}
                       imageUrl={imagePreviewUrl}
                       isFileOver={isFileOver}
                       processFile={processFile}
                       setImageUploadState={setImageUploadState}
                       CurrentComponent={CurrentComponent}
                       handleImage={handleImage}
     />
    </div>
  );

  function onDragFileOver(e){
    e.preventDefault();
    setFileOver(true);
   }
   function onDragFileLeave(){
    setFileOver(false);
   }
  }

