
function convertFromBlob(){
  const reader = new FileReader();

   function convertToObjectUrl(blobData){
        const  filePromise = new Promise((resolve,reject)=>{
           reader.onload = ()=>{
             resolve(reader.result);
          };
          reader.readAsDataURL(blobData);
       });
       
      return filePromise.then(objectURL=>{
         return objectURL;
       });
    }
    
    function convertToArrayBuffer(blobData){
        const  filePromise = new Promise((resolve,reject)=>{
            reader.onload = ()=>{
              resolve(reader.result);
           };
           reader.readAsArrayBuffer(blobData);
        });
        
       return filePromise.then(Buffer=>{
          return Buffer;
        });
    }

    return {
        convertToObjectUrl,
        convertToArrayBuffer
    }
}

function convertBuffers(){

   function convertToArrayBuffer(buffer){
    return new Uint8Array(buffer)['buffer'];
   }
   function convertToBuffer(arrayBuffer){
     return new Uint8Array(arrayBuffer);
   }

   return {
      convertToArrayBuffer,
      convertToBuffer
   }
}

function convertToImageUrl(){

   async function convertFromBuffer(buffer){
      const blob = new Blob([buffer]);
      const blobConverter = convertFromBlob();
     const objectURL = await blobConverter.convertToObjectUrl(blob);
     return objectURL;
   }

   return {
      convertFromBuffer
   }
}

export{
   convertFromBlob,
   convertBuffers,
   convertToImageUrl
}