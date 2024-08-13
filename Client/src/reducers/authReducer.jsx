
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
    userId:action.userId || state.userId,
    authKey:action.authKey || state.authKey,
    profilePhoto:action.profilePhoto || state.profilePhoto,
    saved:action.saved || state.saved
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