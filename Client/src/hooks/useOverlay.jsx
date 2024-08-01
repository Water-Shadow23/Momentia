import { useContext } from "react";
import { OverlayContext } from "../context/OverlayContext.jsx";

export const UseOverlay = () =>{
    return (
      useContext(OverlayContext)
    )
  };