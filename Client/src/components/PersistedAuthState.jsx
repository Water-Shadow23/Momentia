import { Outlet } from "react-router-dom";
import usePersistedAuthState from "../hooks/usePersistedState.jsx";


export default function PersistedAuthState(){
   
    usePersistedAuthState();  
     
    return (
       <>
       <Outlet />
       </>
    )
   }