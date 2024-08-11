import { useState } from "react";
import { overlayConstants } from "../../constants/dispatchConstants.js";
import { useNavigate, useParams } from "react-router-dom";

export default function Modal({isOpen,ComponentToRender,overlayDispatch}){

      const navigate = useNavigate();
      
       return(
          <>
          {isOpen ? 
          <section className="home-modal" onClick={closeModal}>      
             {ComponentToRender ? 
             <ComponentToRender
             overlayDispatch={overlayDispatch}
             /> : ''}

             <div className="close-popup-cross" 
              
             >
               <i className="fa-solid fa-xmark"></i>
             </div>
          </section> : ''}
          </>
       ) 
     
       function closeModal(e){  
          if(!e.target.closest('#modal-cont')){
           overlayDispatch({
            typeAction:overlayConstants.CLOSE
           });
           const modalCont = document.querySelector('#modal-cont');
           if(modalCont.dataset.navigate){
              const ToNumber = Number(modalCont.dataset.navigate);
              if(ToNumber){
                 navigate(ToNumber);
              }else{
               navigate(modalCont.dataset.navigate)
              }
           }
          }    
       } 
}