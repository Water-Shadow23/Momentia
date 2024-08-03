import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



export default function useTabs(listOfTabs){
    const [activeTab,setActiveTab] = useState({
      key:'',
      location:''  
    });
    const location = useLocation();
    
    useEffect(()=>{
    const tab = listOfTabs.find(tab=>{
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