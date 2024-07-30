import SettingsDialog from "../../../components/SettingsDialog.jsx";
import { UseOverlay } from "../../../hooks/useOverlay.jsx";
import CreatePost from "../../../pages/CreatePost/CreatePost.jsx";


export default function NavData(data){
     
     const {OpenOverlay,CloseOverlay,isOpen} = UseOverlay();
      
     const navi = [
        {
          props:{
            hContent:'Home',
            link:'/',
          },
          icon:
           <i className="fa-solid fa-house icon"></i>,
           
        },
        {  
          props:{
            hContent:'Explore',
            link:'/explore',
          }, 
          icon:
                <span className="material-symbols-outlined span-icon">explore</span>,
                
        },
        {
          props:{
            hContent:'Create',
            options:{
              eventHandler:()=>{
                OpenOverlay('Modal',CreatePost);
              } 
            },
          },
          icon:
          <i className="fa-regular fa-square-plus icon"></i>,
          
        },
        {
          props:{
            hContent:'Profile',
            link:`/:accauntName/`,
          }, 
          icon:
            <div className='profile-icon'>
              <img className="icon" src={data.profileImg || ""} alt="Profile Photo" />
            </div>,
            
        },
      ];
      
     const naviOptions = [
        {
          props:{
            hContent:'More',
            linkData:{
            isLinkTo:false
            },
            options:{
              eventHandler:()=>{
                if(!isOpen){
                  OpenOverlay('Dialog',SettingsDialog,'header')
                }else{
                  CloseOverlay(); 
                }
              } 
            },
          },
          icon:
            <i className="fa-solid fa-bars icon"></i>,
               
        },
      ]

    return {
      navi,
      naviOptions
    }
}