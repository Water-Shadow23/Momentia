import React, { useReducer } from "react";
import { initialState, authReducer } from "../reducers/authReducer.jsx";

export const AuthContext = React.createContext({});

export function AuthProvider({children}){
  const [authState,authDispatch] = useReducer(authReducer,initialState);
      
  return (
   <AuthContext value={{authDispatch,authState}}>
    {children}
   </AuthContext>
  )  
}