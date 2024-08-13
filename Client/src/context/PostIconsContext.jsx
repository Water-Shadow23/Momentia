import React, { useReducer } from "react";
import { initialState, postIconsReducer } from "../reducers/postIconsReducer";

export const PostIconsContext = React.createContext();


export function PostIconsProvider({children}){
    const [postIconsState,postIconsDispatch] = useReducer(postIconsReducer,initialState);

    return (
        <>
        <PostIconsContext.Provider 
        value={{
          postIconsDispatch,
          postIconsState  
        }}
        >
          {children}    
        </PostIconsContext.Provider>  
        </>
    )
}