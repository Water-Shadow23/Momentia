import React , {useState,useContext} from 'react'
import Overlay from '../layout/Popups/Overlays.jsx';
import Modal from '../layout/Popups/Modal.jsx';
import Dialog from '../layout/Popups/Dialog.jsx';

export const OverlayContext = React.createContext({});

export function OverlayProvider({children}){
 const [overlayState,setOverlay] = useState({
    isOpen:undefined,
    ComponentToRender:undefined,
    typeOverlay:undefined,
    destinationToRender:undefined
 }); 
 
 
 function OpenOverlay(typeOverlay,component,destination){
  setOverlay((preValue)=>{
       preValue.isOpen = true;
       preValue.ComponentToRender = component || '';
       preValue.typeOverlay = typeOverlay
       preValue.destinationToRender = destination || '';
       return {...preValue}
      });
 } 
 function CloseOverlay(){
  setOverlay((preValue)=>{
      preValue.isOpen = false;
      preValue.ComponentToRender = ""; 
      preValue.typeOverlay = "";
      preValue.destinationToRender = "";
      return {...preValue};
    });
 } 

 return (
    <>
    
    <OverlayContext.Provider value={{OpenOverlay,CloseOverlay,isOpen:overlayState.isOpen}}>
    {children}
    </OverlayContext.Provider>

     {overlayState.typeOverlay === 'Modal' ? 
     <Overlay>
      <Modal {...overlayState} closeOverlay={CloseOverlay}/>
     </Overlay> : ''
     }
       
     {overlayState.typeOverlay === 'Dialog' ?
         <Overlay destination={overlayState.destinationToRender}>
           <Dialog {...overlayState} />  
         </Overlay> : ''
     } 
    </>
 )
}

