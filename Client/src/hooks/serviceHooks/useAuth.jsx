import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import { login, register } from '../../services/authService.js';
import { authConstants, overlayConstants } from '../../constants/dispatchConstants.js';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { OverlayContext } from '../../context/OverlayContext.jsx';

export default function useAuth(){
  const {authDispatch} = useContext(AuthContext);
  const [cookies,setCokie,removeCookie] = useCookies(['token']);

  const {overlayDispatch} = useContext(OverlayContext);
  
  const navigate = useNavigate();
  
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
    overlayDispatch({
      typeAction:overlayConstants.CLOSE
    })
    authDispatch({
      typeAction:authConstants.CLEAR_AUTH
    });
    navigate('/');
  }

 return {
  loginUser,
  registerUser,
  logoutUser
 }
}