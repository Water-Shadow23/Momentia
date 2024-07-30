import { useContext } from "react";
import { OverlayContext } from "../context/OverlayContext";

export const UseOverlay = () =>{
    return (
      useContext(OverlayContext)
    )
  };