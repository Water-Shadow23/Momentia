import { OverlayProvider } from "../context/OverlayContext.jsx";
import Header from "./Header/Header.jsx";


export default function Main({
    children
}){
 
   return (
    <>
     <OverlayProvider>
      <Header />
     </OverlayProvider>

     {children} 
    </>
   ) 
}