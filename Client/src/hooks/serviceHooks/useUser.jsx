import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import * as userService from "../../services/userService.js";


export function useUser(){
    const {authState} = useContext(AuthContext);
    
     async function getOwnPosts(){
       return userService.getAccauntOwnPosts({authKey:authState.authKey});
    }

    async function getSavedPosts(){
        return userService.getAccauntSavedPosts({authKey:authState.authKey});  
    }

    async function getData(){
        return userService.getAccauntData({authKey:authState.authKey});  
    }

    async function edit(body){
        return userService.editAccaunt({
         authKey:authState.authKey,
         body
        }); 
    }
    
    async function terminate(){
     return userService.deleteAccaunt({
      authKey:authState.authKey 
     });
    }

    async function followUser(){
     return userService.followUser({
        authKey:authState.authKey,
        userId:authState.userId
     }); 
    }

    async function unfollowUser(){
     return userService.unfollowUser({
        authKey:authState.authKey,
        userId:authState.userId 
     });  
    }

    return {
        getOwnPosts,
        getSavedPosts,
        getData,
        edit,
        terminate,
        followUser,
        unfollowUser
    }
}