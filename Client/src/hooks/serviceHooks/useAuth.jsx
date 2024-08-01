import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import { login, register } from '../../services/authService.js';
import { authConstants } from '../../constants/dispatchConstants.js';
import { useCookies } from 'react-cookie';

export default function useAuth(){
  const {authDispatch} = useContext(AuthContext);
  const [cookies,setCokie,removeCookie] = useCookies(['token']);
  
 async  function loginUser(payload){
    const resData = await login(payload); 
    setCokie('token',resData.token); 
    authDispatch({
      typeAction:authConstants.SET_AUTH,
      userId:resData.id,
      authKey:resData.token
    });
  }
 
 async function registerUser(payload){
    const resData = await register(payload);
    setCokie('token',resData.token); 
    authDispatch({
      typeAction:authConstants.SET_AUTH,
      userId:resData.id,
      authKey:resData.token
    });
  }

  function logoutUser(){
    removeCookie('token');
    authDispatch({
      typeAction:authConstants.CLEAR_AUTH
    });
  }

 return {
  loginUser,
  registerUser,
  logoutUser
 }
}