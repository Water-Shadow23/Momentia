import { useState } from "react";
import { overlayConstants } from "../../constants/dispatchConstants.js";

export default function Modal({isOpen,ComponentToRender,overlayDispatch}){

       return(
          <>
          {isOpen ? 
          <section className="home-modal" onClick={closeModal}>      
             {ComponentToRender ? 
             <ComponentToRender
             overlayDispatch={overlayDispatch}
             /> : ''}

             <div className="close-popup-cross" onClick={(e)=>{
              if(e.target.closest('.close-popup-cros')){
                overlayDispatch({
                 typeAction:overlayConstants.CLOSE
                })
              }
             }}>
               <i className="fa-solid fa-xmark"></i>
             </div>
          </section> : ''}
          </>
       ) 
     
       function closeModal(e){  
          if(!e.target.closest('#modal-cont')){
           overlayDispatch({
            typeAction:overlayConstants.CLOSE
           })
          }    
       } 
}