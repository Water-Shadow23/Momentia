import { useState } from "react";


export default function useCharCounter(defaultValue){
    const [chars,setCount] = useState(defaultValue || 0);

    function charCounter(e){
        const dataLength = e.target.value.length;
        setCount(dataLength);
       }
    
       return [
        chars,
        charCounter
       ]
}