import { useState } from "react";
import { Link } from "react-router-dom"
import {NavigationLink,NavigationOptions} from "./Navigation/NavLinkContainer.jsx";
import NavData from "./Navigation/NavData.jsx";
import useAuth from "../../hooks/serviceHooks/useAuth.jsx";

export default function Header(){

  const navigations = NavData()
  const {logoutUser} = useAuth();  
  
    return(
      <header>
          <div className="logo-cont">
            <Link to="/">
                <h2 className="logo">Momentia</h2>
            </Link>  
          </div> 
          
          <div className="nav-actions">
            {navigations.navi.map(element=>
              <NavigationLink key={element.props.hContent}
              {...element.props} 
              >
             {element.icon}
              </NavigationLink>  
            )}
          </div>
    
          <div className="nav-options">
             {navigations.naviOptions.map((element)=>
              <NavigationOptions key={element.props.hContent} 
              {...element.props}
              authActions={{
                logoutUser
              }}
              >
              {element.icon}
               </NavigationOptions>  
             )}
          </div>

        </header>

    )
}