
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
    saved:action.saved || state.saved,
    username:action.username || state.username || ''
   }
  case 'clearAuth':
   return {
    isAuthenticated:false,
    userId:'',
    authKey:'',
    profilePhoto:'',
    saved:[],
    username:''
   } 
   default:
    return state;
 }
}