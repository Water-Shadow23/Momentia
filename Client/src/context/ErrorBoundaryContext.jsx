import React, { useState } from "react"
import {ErrorResponser} from "../components/ErrorResponser.jsx";

export const ErrorBoundaryContext = React.createContext({});


export function ErrorBoundary({children}){
 const [errorState,setErrorState] = useState({
   hasError:false,
   error:''
 });
 
 function setError(errorData){
   setErrorState(()=>({
    hasError:true,
    error:errorData
   })) 
 }

 function resetError(){
    setErrorState(()=>({
     hasError:false,
     error:''
    }));
 }


 return (
    <>
    {
    !errorState.hasError ? 
    <ErrorBoundaryContext.Provider value={{setError,resetError}}>
     {children}
    </ErrorBoundaryContext.Provider>
    :
    <ErrorResponser error={errorState.error}/> 
    }
    </>
 )
}