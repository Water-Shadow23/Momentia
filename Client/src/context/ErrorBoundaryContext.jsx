import React, { useReducer } from "react"
import {ErrorResponser} from "../components/ErrorResponser.jsx";
import { errorReducer, initialState } from "../reducers/errorReducer.jsx";

export const ErrorBoundaryContext = React.createContext({});


export function ErrorBoundary({children}){
 const [errorState,errorDispatch] = useReducer(errorReducer,initialState);
 
 return (
    <>
    {
    !errorState.hasError ? 
    <ErrorBoundaryContext.Provider value={errorDispatch}>
     {children}
    </ErrorBoundaryContext.Provider>
    :
    <ErrorResponser error={errorState.error} dispatch={errorDispatch}/> 
    }
    </>
 )
}