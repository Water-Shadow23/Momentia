
export const initialState= {
    isAuthenticated:false,
    userId:'',
    authKey:''
}

export function authReducer(state,action){
 switch(action.typeAction){
  case 'setAuth':
   return {
    isAuthenticated:true,
    userId:action.userId,
    authKey:action.authKey,
    profilePhoto:action.profilePhoto
   }
  case 'clearAuth':
   return {
    isAuthenticated:false,
    userId:'',
    authKey:'',
    profilePhoto:''
   } 
   default:
    return state;
 }
}