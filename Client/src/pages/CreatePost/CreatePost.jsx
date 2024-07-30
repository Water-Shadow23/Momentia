import { useState } from "react";
import useImageUpload from "../../hooks/useImageUpload.jsx";
import PostFileUpload from "./CreateParts/PostFileUpload.jsx";
import PostViewUpload from "./CreateParts/PostViewUpload.jsx";


export default function CreatePost() {
  const [postData,setPostData] = useState({
    postImage:'',
    caption:'', 
  });

  const [isFileOver,setFileOver] = useState(false);
  const [CurrentComponent,setCurrentComponent] = useState(PostFileUpload);
  
  //
  const [imagePreviewUrl,setImageUploadState,processFile] = useImageUpload()
  
  async function handleImage(e,nextCurrentComponent){
      if(CurrentComponent.name === 'UploadComponent') {
      const [imageUrl,imageBuffer] = await processFile(e);
      setFileOver(false); 
      setImageUploadState(setPostData,{
        toProp:'postImage',
        data:{
          imageUrl:imageUrl,
          imageBuffer:imageBuffer 
        }
      });
      setCurrentComponent(nextCurrentComponent); 
    }
  }
  
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

