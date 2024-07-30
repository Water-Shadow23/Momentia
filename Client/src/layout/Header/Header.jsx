import { useState } from "react";
import { Link } from "react-router-dom"
import {NavigationLink,NavigationOptions} from "./Navigation/NavLinkContainer.jsx";
import NavData from "./Navigation/NavData.jsx";

export default function Header(){
  const [active,setActiveLink] = useState({
    key:''
  });
    
  const profileImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d733c1e1-d7d1-4f92-9abb-628b1aa5af6a/dfzlns7-c3089e5b-f230-4a67-b56a-706f105c6bed.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MzNjMWUxLWQ3ZDEtNGY5Mi05YWJiLTYyOGIxYWE1YWY2YVwvZGZ6bG5zNy1jMzA4OWU1Yi1mMjMwLTRhNjctYjU2YS03MDZmMTA1YzZiZWQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GER60TdONmCscZ3QvsDf0bVQRk9bsnhdB7FB9RviXK0';
 
  const navigations = NavData({
    profileImg
  })
    
  

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
              active={active}
              setActiveLink={setActiveLink}         
              >
             {element.icon}
              </NavigationLink>  
            )}
          </div>
    
          <div className="nav-options">
             {navigations.naviOptions.map((element)=>
              <NavigationOptions key={element.props.hContent} 
              {...element.props}
              active={active}
              setActiveLink={setActiveLink} 
              >
              {element.icon}
               </NavigationOptions>  
             )}
          </div>

        </header>

    )
}