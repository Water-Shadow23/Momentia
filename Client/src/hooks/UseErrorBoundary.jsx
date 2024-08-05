import { useContext } from "react";
import { ErrorBoundaryContext } from "../context/ErrorBoundaryContext.jsx";


export default function useErrorBoundary(){
    return (
        useContext(ErrorBoundaryContext)
    )
}