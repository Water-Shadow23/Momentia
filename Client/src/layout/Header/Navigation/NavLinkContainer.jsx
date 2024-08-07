import { useState } from 'react';
import {NavLink} from 'react-router-dom'


export function NavigationLink({
  hContent,link,options,children
}){

    return (
        <>
         {link ? 
          <NavLink 
           className={({isActive})=>`htext-cont ${ isActive ? 'hactive' : ''}`}
           to={link}
          >
            <div className="link-box">
              {children}
              <p className='htext-content'>{hContent}</p>
            </div>
         </NavLink> : 
         
         <div 
         className={`htext-cont`}
         onClick={(e)=>{
           options.eventHandler()
         }}   
        >
          <div className='link-box'> 
            {children}
            <p className='htext-content'>{hContent}</p>
          </div>
       </div>
          } 

       </>
    )

}

export function  NavigationOptions({
  hContent,options,children,authActions
}){ 

  const [activeState,setActiveState] = useState({
    key:'',
    isActive:false
  });
 
  return (
    <>
    <div 
         className={`htext-cont ${activeState.key === hContent? 'hactive' : ''}`}
         onClick={(e)=>{
          setDivActive()
          options.eventHandler(e,setActiveState,authActions)
         }}   
        >
          <div className='link-box'> 
            {children}
            <p className='htext-content'>{hContent}</p>
          </div>
    </div>
    </>
  )

  function setDivActive(){
    if(activeState.isActive){
      setActiveState({
       key:'',
       isActive:false
      }); 
      return;
    }else{
      setActiveState({
         key:hContent,
         isActive:true
       }); 
    }    
 }
}