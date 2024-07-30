import {Link} from 'react-router-dom'

export default function SettingsDialog(){
  
     

    return(
        <div className="settings-popup">
            <div className="settings-upper-box">
               <Link to="#" className="settings-box link-box">
                <i className="fa-solid fa-gear"></i>
                 <p>Settings</p>
               </Link>
               <Link to="#" className="settings-box link-box">
                <i className="fa-solid fa-bookmark"></i>
                <p>Saved</p>
               </Link>
              <div className="upper-box-border"></div>
            </div>
    
            <div className="settings-down-box">
               {/* <div className="settings-box">
                <p>Switch accounts</p>
              </div>     */}

              <div className="settings-box link-box">
                <p>Log out</p>
              </div>    
            </div>
       </div>
    )
}