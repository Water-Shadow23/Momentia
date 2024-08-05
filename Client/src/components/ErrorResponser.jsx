import { Navigate } from "react-router-dom"
import NotFound from "../pages/NotFound/NotFound.jsx"
import useAuth from "../hooks/serviceHooks/useAuth.jsx"
import { useEffect } from "react";



export function ErrorResponser({error,dispatch}){
   
   const {logoutUser} = useAuth();

   useEffect(()=>{
    dispatch({
      typeAction:'resetError'  
    })
   },[error,dispatch])

   if(error.type === 'externalFail'){
      if(error.code === 404){
        return (
            <>
            <NotFound />
            </>
        )
      } 
       if(error.code === 403){
           return (
               <>
               <NotFound />
               </>
           )
       }
       if(error.code === 401){
        logoutUser();
        return (
            <>
            <Navigate to='/login' />
            </>
        )
       }

   } 

   else if (error.type === 'internalFail'){
    // oops something went wrong!
    // for now lets just say that this doesn't exist :)
   } 

}
