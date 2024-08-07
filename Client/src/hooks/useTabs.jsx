import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";



export default function useTabs(listOfTabs){
    const [activeTab,setActiveTab] = useState({
      key:'',
      location:''  
    });
    const location = useLocation();
    const params = useParams();
    const userId = params.userId;
    
    useEffect(()=>{
    const tab = listOfTabs.find(tab=>{
      if(userId){
       return tab.hasOwnProperty('UserLocation') 
      } 
      return tab.location === location.pathname
     });
    setActiveTab({
     key:tab.key,
     location:tab.location 
    });
     
    return ()=>{
      setActiveTab({
        key:'',
        location:''
      })  
    }   
    },[location])

    function setActive(tabKey,tabLocation){
        if(tabKey !== activeTab.key){
            setActiveTab({
                key:tabKey,
                location:tabLocation
            })
         }
    }
   
    return [
        activeTab,
        setActive
    ]
}