import React, { useReducer } from "react";
import { initialState, authReducer } from "../reducers/authReducer.jsx";

export const AuthContext = React.createContext({});

export function AuthProvider({children}){
  const [authState,authDispatch] = useReducer(authReducer,initialState);
  
  const isAuthStateLoaded = authState.isAuthenticated!== undefined;
      
  return (
   <AuthContext.Provider value={{authDispatch,authState,isAuthStateLoaded}}>
    {children}
   </AuthContext.Provider>
  )  
}