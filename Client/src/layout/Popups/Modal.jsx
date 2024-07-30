import { useState } from "react";

export default function Modal({isOpen,ComponentToRender,closeOverlay}){

       return(
          <>
          {isOpen ? 
          <section className="home-modal" onClick={closeModal}>      
             {ComponentToRender ? 
             <ComponentToRender
                
             /> : ''}

             <div className="close-popup-cross" onClick={(e)=>{
              if(e.target.closest('.close-popup-cros')){
                closeOverlay();
              }
             }}>
               <i className="fa-solid fa-xmark"></i>
             </div>
          </section> : ''}
          </>
       ) 
     
       function closeModal(e){  
          if(!e.target.closest('#modal-cont')){
            closeOverlay();
          }    
       } 
}