import { useState } from "react";
import { convertFromBlob } from "../utils/convertImage.js";

export default function useImageUpload(){
  const [imagePreviewUrl,setImagePreviewUrl] = useState('');
  
     async function processFile(e){
            e.preventDefault();
            const blobData = e.dataTransfer?.files[0] || e.currentTarget.files[0] ;
            const blobConverter = convertFromBlob();
          
            const imageUrl = await blobConverter.convertToObjectUrl(blobData); 
           
            return [imageUrl];
          }
          
          async function setImageUploadState(setData,body){
            setImagePreviewUrl(body.data.imageUrl); 
            setData((preValue)=>{
              if(body.hasOwnProperty('toProp')){
                preValue.data[body.toProp] =  body.data.imageUrl
                return {...preValue};
              }else{
                return body.data.imageUrl;
              }
            });
            }
     
     return[
       imagePreviewUrl,
       setImageUploadState,
       processFile,
     ]
}