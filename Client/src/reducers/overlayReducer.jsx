
export const initialState = {
    isOpen:undefined,
    ComponentToRender:undefined,
    typeOverlay:undefined,
    destinationToRender:undefined
 }

export function overlayReducer(state,action){
 
  switch(action.typeAction){
    case 'openOverlay': 
    return {
      isOpen:true,
      ComponentToRender:action.component || '',
      typeOverlay:action.typeOverlay,
      destinationToRender:action.destination || '',
    };

    case 'closeOverlay':
    return {
      isOpen:false,
      ComponentToRender:'',
      typeOverlay:'',
      destinationToRender:'',
    };

    default:
    return state  
  }  
}