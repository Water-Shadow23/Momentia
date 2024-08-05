
export const initialState = {
    hasError:false,
    error:'',
    errorType:''
}

export function errorReducer(state,action){
 switch(action.typeAction){
    case 'setError':
      const error = action.error;
      const errorObj = {
        hasError:true,
        error:action.error,  
        errorType:''
       };

      if(error.type === 'externalFail'){
        if(error.code === 404 || error.code === 403){
          errorObj.errorType = 'ExternalNotFound';
        }   
       }
       else if(error.type === 'internalFail'){
        // oops something went wrong :)
         errorObj.errorType = 'InternalNotFound'
      }

      return {...errorObj};
      
    case 'resetError':
      return {
       hasError:false,
       error:'',
       errorType:''
      };
    default:
     return state;           
 }
}