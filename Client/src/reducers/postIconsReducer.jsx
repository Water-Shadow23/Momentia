

export const initialState = {
    isLiked:false,
    isSaved:false
}

export function postIconsReducer(state,action){
    switch(action.typeAction){ 
        case 'setState':
         return {
          isLiked: action.data.isLiked || state.isLiked,
          isSaved: action.data.isSaved || state.isSaved
         }   
        case 'like':
          return {
            isLiked:true,
            isSaved:state.isSaved
          }
        case 'unlike':
          return {
            isLiked:false,
            isSaved:state.isSaved
          }
        case 'save':
          return {
            isLiked:state.isLiked,
            isSaved:true
          }
        case 'unsave':
          return {
            isLiked:state.isLiked,
            isSaved:false
          }
        default:
          return state  
    }
}
