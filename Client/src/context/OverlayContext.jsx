import React , {useReducer, useRef, useState} from 'react'
import Overlay from '../layout/Popups/Overlays.jsx';
import Modal from '../layout/Popups/Modal.jsx';
import Dialog from '../layout/Popups/Dialog.jsx';

import { initialState, overlayReducer } from '../reducers/overlayReducer.jsx';

export const OverlayContext = React.createContext({});

export function OverlayProvider({children}){
 const [overlayState,overlayDispatch] = useReducer(overlayReducer,initialState); 

 return (
    <>
    
    <OverlayContext.Provider value={{overlayDispatch,overlayState}}>
    {children}
    </OverlayContext.Provider>

     {overlayState.typeOverlay === 'Modal' ? 
     <Overlay>
      <Modal {...overlayState} overlayDispatch={overlayDispatch}/>
     </Overlay> : ''
     }
       
     {overlayState.typeOverlay === 'Dialog' ?
         <Overlay destination={overlayState.destinationToRender}>
           <Dialog {...overlayState} overlayDispatch={overlayDispatch}/>  
         </Overlay> : ''
     } 
    </>
 )
}

