import { useContext } from "react";
import SettingsDialog from "../../../components/SettingsDialog.jsx";
import { overlayConstants } from "../../../constants/dispatchConstants.js";
import { UseOverlay } from "../../../hooks/useOverlay.jsx";
import CreatePost from "../../../pages/CreatePost/CreatePost.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";


export default function NavData(data){
     
     const {overlayDispatch,overlayState} = UseOverlay();
     const {authState} = useContext(AuthContext);

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
                overlayDispatch({
                  typeAction:overlayConstants.OPEN,
                  component:CreatePost,
                  typeOverlay:'Modal', 
                });
              } 
            },
          },
          icon:
          <i className="fa-regular fa-square-plus icon"></i>,
          
        },
        {
          props:{
            hContent:'Profile',
            link:`/accaunts`,
          }, 
          icon:
            <div className='profile-icon'>
              <img className="icon" src={authState?.profilePhoto || ""} alt="Profile Photo" />
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
              eventHandler:(e,setActiveState,authActions)=>{
             
                if(!overlayState.isOpen){

                  overlayDispatch({
                    typeAction:overlayConstants.OPEN,
                    component:SettingsDialog(setActiveState,authActions),
                    typeOverlay:'Dialog',
                    destination:'header' 
                  });
                }else{
                 
                  overlayDispatch({
                    typeAction:overlayConstants.CLOSE,
                  });
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