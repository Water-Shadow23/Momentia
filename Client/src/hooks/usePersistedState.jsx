import { useCookies } from "react-cookie";
import useErrorBoundary from "./UseErrorBoundary.jsx";
import { getAccauntData } from "../services/userService.js";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { authConstants } from "../constants/dispatchConstants.js";


export default function usePersistedAuthState(){
    const [cookies,setCookies,removeCookies] = useCookies(['token']);
    const {authDispatch,authState} = useContext(AuthContext);
    const navigate = useNavigate();
   
    useEffect(()=>{
               
        (async function(){
            if(cookies.token && !authState.isAuthenticated ){
             try{
              const accauntData = await getAccauntData({
                authKey:cookies.token
              });
              authDispatch({
               typeAction:authConstants.SET_AUTH,
               userId:accauntData.data._id,
               authKey:cookies.token,
               profilePhoto:accauntData.data.profilePhoto || ''
              });
               
             }catch(err){

              if(err.type === 'externalFail'){
               if(err.code === 401){
                removeCookies('token');
                navigate('/login');
               }
              } 
              else if(err.type === 'internalFail'){
                //500+ errors
                // lets pretend that this doesn't exist :).
              }
             }
        }
        })();

       },[]);

   
}
