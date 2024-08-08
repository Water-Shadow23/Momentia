
export const initialState= {
    isAuthenticated:undefined,
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
    profilePhoto:action.profilePhoto,
    saved:action.saved
   }
  case 'clearAuth':
   return {
    isAuthenticated:false,
    userId:'',
    authKey:'',
    profilePhoto:'',
    saved:[]
   } 
   default:
    return state;
 }
}