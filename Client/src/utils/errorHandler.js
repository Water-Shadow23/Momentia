

//Check programming errors
export default function isBadRequest(error){
    if(error.type === 'externalFail'){
          if(error.name === 'RequestError'){
           console.error({
               name:error.name,
               message:error.message,
            });
           return false;
          }
          else if(error.name === 'ValidationError'){
            console.error({
               name:error.name,
               message:error.message,
               errors:error.errors,
            });
           return false; 
          }
    } 
    return true;
   }