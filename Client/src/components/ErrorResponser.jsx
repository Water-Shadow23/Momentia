import { Navigate } from "react-router-dom"
import NotFoundPage from "../pages/NotFound/NotFoundPage"



export function ErrorResponser({error}){
   
   if(error.type === 'externalFail'){
      if(error.code === 404){
        return (
            <>
            <NotFoundPage />
            </>
        )
      } 
       if(error.code === 403){
           return (
               <>
               <NotFoundPage />
               </>
           )
       }
       if(error.code === 401){
        //TODO clear token from cookie
         
       }

   } 

   else if (error.type === 'internalFail'){
    // oops something went wrong!
    // for now lets just say that this doesn't exist :)
   } 

}
