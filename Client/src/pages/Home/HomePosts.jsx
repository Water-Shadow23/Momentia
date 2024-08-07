import { useContext, useEffect, useState } from "react"
import Post from "./Post.jsx"
import usePost from "../../hooks/serviceHooks/usePosts.jsx";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import isBadRequest from "../../utils/errorHandler.js";
import { errorConstants } from "../../constants/dispatchConstants.js";
import { AuthContext } from "../../context/AuthContext.jsx";


export default function HomePosts(){
  const [postsData,setPostsData] = useState();

  const {getPostsFromFollowedUsers} = usePost(); 
  const {errorDispatch} = useErrorBoundary();

  const {authDispatch,authState} = useContext(AuthContext);


    useEffect(()=>{
     if(authState.isAuthenticated){
       (async function(){
         try{
           const resData = await getPostsFromFollowedUsers(1,30);
           setPostsData((prevData)=>{
            return {
              ...prevData,
              ...resData.data
            }
           });
         }catch(err){
          if(!isBadRequest(err)){
            errorDispatch({
                typeAction:errorConstants.SET_ERROR,
                error:err
              });
          }
         }
       })()
     } 
    },[authState]);
    

    return (
      <div className="home-posts-cont">
       {postsData ? 
      //  <Post />    
      ""
       :
       '' 
      }
      </div>
    )
}


