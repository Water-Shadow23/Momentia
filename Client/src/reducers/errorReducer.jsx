
export const initialState = {
    hasError:false,
    error:''
}

export function errorReducer(state,action){
 switch(action.typeAction){
    case 'setError':
      return {
       hasError:true,
       error:action.error,  
      };
    case 'resetError':
      return {
       hasError:false,
       error:'',
      };
    default:
     return state;           
 }
}