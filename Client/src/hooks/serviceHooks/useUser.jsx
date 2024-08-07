import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import * as userService from "../../services/userService.js";


export function useUser(){
    const {authState} = useContext(AuthContext);
    
     async function getOwnPosts(){
       return userService.getAccauntOwnPosts({
        authKey:authState.authKey
       });
    }

    async function getSavedPosts(){
        return userService.getAccauntSavedPosts({
                authKey:authState.authKey
            });  
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

    async function followUser(userId){
     return userService.followUser({
        authKey:authState.authKey,
        userId:userId
     }); 
    }

    async function unfollowUser(userId){
     return userService.unfollowUser({
        authKey:authState.authKey,
        userId:userId
     });  
    }

    async function getUserData(userId){
        return userService.getUserData({
            userId:userId
         }); 
    }

    async function getUserPosts(userId){
        return userService.getUserPosts({
            userId:userId
         });   
    }

    return {
        getOwnPosts,
        getSavedPosts,
        getData,
        edit,
        terminate,
        followUser,
        unfollowUser,
        getUserData,
        getUserPosts
    }
}