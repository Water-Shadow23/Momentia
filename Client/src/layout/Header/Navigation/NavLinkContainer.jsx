import {NavLink} from 'react-router-dom'


export function NavigationLink({
  hContent,link,options,children,
  setActiveLink,active
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
         className={`htext-cont ${active.key === hContent? 'hactive' : ''}`}
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
  hContent,options,children,
  setActiveLink,active
}){ 
 
  return (
    <>
    <div 
         className={`htext-cont ${active.key === hContent? 'hactive' : ''}`}
         onClick={(e)=>{
          setDivOptionActive(e)
          options.eventHandler(e)
         }}   
        >
          <div className='link-box'> 
            {children}
            <p className='htext-content'>{hContent}</p>
          </div>
    </div>
    </>
  )

  function setDivOptionActive(e){
    if(e.currentTarget.classList.contains('hactive')){
      setActiveLink({
       key:''
      }); 
      return;
    }    
     setActiveLink({
       key:hContent
     }); 
 }
}