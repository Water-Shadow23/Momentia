import { useEffect, useState } from "react";
import useErrorBoundary from "../UseErrorBoundary.jsx";
import isBadRequest from "../../utils/errorHandler.js";


export default function useFetch(callback,dependancies){ 
  const [dataState,setData] = useState();
  const errorDispatch = useErrorBoundary();
    
  useEffect( ()=>{
    
    (async function(){
        try{
          const data = await callback();
          setData((state)=>data);   
        }catch(err){
          if(!isBadRequest(err)){
            errorDispatch({
                typeAction:'setError',
                error:err
              });
          }
        }
    })();

  },dependancies);

  return [dataState];
}