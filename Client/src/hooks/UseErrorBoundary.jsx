import { useContext } from "react";
import { ErrorBoundaryContext } from "../components/ErrorBoundary.jsx";


export default function useErrorBoundary(){
    return (
        useContext(ErrorBoundaryContext)
    )
}