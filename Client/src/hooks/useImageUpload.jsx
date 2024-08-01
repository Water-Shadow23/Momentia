import { useState } from "react";
import { convertBuffers, convertFromBlob } from "../utils/convertImage.js";

export default function useImageUpload(){
  const [imagePreviewUrl,setImagePreviewUrl] = useState('');
  
     async function processFile(e){
            e.preventDefault();
            const blobData = e.dataTransfer?.files[0] || e.currentTarget.files[0] ;
            const blobConverter = convertFromBlob();
            const bufferConverter = convertBuffers();
          
            const imageArrayBuffer = await blobConverter.convertToArrayBuffer(blobData);
            const imageBuffer = bufferConverter.convertToBuffer(imageArrayBuffer);
            const imageUrl = await blobConverter.convertToObjectUrl(blobData); 
           
            return [imageUrl,imageBuffer];
          }
          
          async function setImageUploadState(setData,body){
            setImagePreviewUrl(body.data.imageUrl); 
            setData((preValue)=>{
              if(body.hasOwnProperty('toProp')){
                preValue[body.toProp] =  body.data.imageBuffer
                return {...preValue};
              }else{
                return body.data.imageBuffer;
              }
            });
            }
     
     return[
       imagePreviewUrl,
       setImageUploadState,
       processFile,
     ]
}