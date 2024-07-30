import { createPortal } from "react-dom";

const mountElement = document.getElementById('overlays')

export default function Overlay({children,destination}){
    
    const nodeDestination = destination ? document.querySelector(destination) : mountElement;

    return (
     createPortal(children,nodeDestination)
    )
 }