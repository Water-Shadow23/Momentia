import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NotFound from "../pages/NotFound/NotFound";



export default function AuthGuard({access,children}){
  const {authState,isAuthStateLoaded} = useContext(AuthContext);
  const [isAuthorised,setIsAuthorised] = useState();


  useEffect(()=>{
   if(isAuthStateLoaded){
       const typeUser = authState.isAuthenticated ? 'u' : 'g';
       setIsAuthorised(()=>{
        return access.includes(typeUser);
       })
    }     
},[authState.isAuthenticated]);

if(isAuthStateLoaded){
   if(isAuthorised === true){
    return (
      children
    )
   } 
   else if(isAuthorised === false){
    return (
       <NotFound /> 
    )
   }
}
}