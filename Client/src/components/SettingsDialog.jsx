import {Link} from 'react-router-dom'
import {  overlayConstants } from '../constants/dispatchConstants.js'

export default function SettingsDialog(setActiveState,authActions){
   
  
  return ({overlayDispatch}) =>{
    return(
        <div className="settings-popup">
            <div className="settings-upper-box">
               <Link to="/accaunts/edit" className="settings-box link-box" onClick={()=>{
                  setActiveState({
                    isActive:false,
                    key:''
                  });
                  overlayDispatch({
                    typeAction:overlayConstants.CLOSE
                  })
               }}>
                <i className="fa-solid fa-gear"></i>
                 <p>Settings</p>
               </Link>
               <Link to="/accaunts/saved" className="settings-box link-box"  onClick={()=>{
                  setActiveState({
                    isActive:false,
                    key:''
                  });
                  overlayDispatch({
                    typeAction:overlayConstants.CLOSE
                  });
                  
              }}>
                <i className="fa-solid fa-bookmark"></i>
                <p>Saved</p>
               </Link>
              <div className="upper-box-border"></div>
            </div>
    
            <div className="settings-down-box">
               {/* <div className="settings-box">
                <p>Switch accounts</p>
              </div>     */}

              <div className="settings-box link-box" 
              onClick={()=>{
                authActions.logoutUser();
              }}>
                <p>Log out</p>
              </div>    
            </div>
       </div>
    )
  }
}