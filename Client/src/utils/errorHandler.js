

//Check programming errors
export default function isBadRequest(error){
    if(error.type === 'externalFail'){
          if(error.name === 'RequestError'){
           console.error({
               name:error.name,
               message:error.message,
            });
           return true;
          }
          else if(error.name === 'ValidationError'){
            console.error({
               name:error.name,
               message:error.message,
               errors:error.errors,
            });
           return true; 
          }
    } 
    return false;
   }