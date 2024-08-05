import React, { useEffect, useReducer } from "react"
import { errorReducer, initialState } from "../reducers/errorReducer.jsx";

export const ErrorBoundaryContext = React.createContext({});


export function ErrorBoundary({children}){
 const [errorState,errorDispatch] = useReducer(errorReducer,initialState);

 return (
    <>
    <ErrorBoundaryContext.Provider value={{errorDispatch,errorState}}>
     {children}
    </ErrorBoundaryContext.Provider>
    </>
 )
}