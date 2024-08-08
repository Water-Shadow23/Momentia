import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import {NavigationLink,NavigationOptions} from "./Navigation/NavLinkContainer.jsx";
import NavData from "./Navigation/NavData.jsx";
import useAuth from "../../hooks/serviceHooks/useAuth.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function Header(){

  const navigations = NavData();
  const {authState} = useContext(AuthContext);
  const {logoutUser} = useAuth();  

  const navCont = navigations.navi.map(element=>{
    if(element.private && authState.isAuthenticated){
      return   <NavigationLink key={element.props.hContent}
      {...element.props} 
      >
     {element.icon}
      </NavigationLink>
    }
    else if(!element.private){
      return   <NavigationLink key={element.props.hContent}
      {...element.props} 
      >
     {element.icon}
      </NavigationLink>
    }
  });

  const navOptionsCont = navigations.naviOptions.map(element=>{
    if(element.private && authState.isAuthenticated){
      return  <NavigationOptions key={element.props.hContent} 
      {...element.props}
      authActions={{
        logoutUser
      }}>
       {element.icon}
       </NavigationOptions>    
    }
    else if(!element.private){
      return  <NavigationOptions key={element.props.hContent} 
      {...element.props}
      authActions={{
        logoutUser
      }}>
       {element.icon}
       </NavigationOptions>
    }
  })
  
    return(
      <header>
          <div className="logo-cont">
            <Link to="/">
                <h2 className="logo">Momentia</h2>
            </Link>  
          </div> 
          
          <div className="nav-actions">
            {navCont}
          </div>
    
          <div className="nav-options">
            {navOptionsCont}
          </div>

        </header>

    )
}