import { useContext, useEffect, useRef, useState } from "react"
import Post from "./Post.jsx"
import usePost from "../../hooks/serviceHooks/usePosts.jsx";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import isBadRequest from "../../utils/errorHandler.js";
import { errorConstants } from "../../constants/dispatchConstants.js";
import { AuthContext } from "../../context/AuthContext.jsx";


export default function HomePosts(){
  const [postsData,setPostsData] = useState();

  const {getPostsFromFollowedUsers,getAllPosts} = usePost(); 
  const {errorDispatch} = useErrorBoundary();

  const {authState} = useContext(AuthContext);
  const isMounted = useRef(false);

    useEffect(()=>{ 
     if(authState.isAuthenticated){
       (async function(){
         try{
           const resData = await getPostsFromFollowedUsers();
           setPostsData(()=>{
            return [...resData.data]
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
     }else if(authState.isAuthenticated === false){
      (async function(){
        try{
          const resData = await getAllPosts();
          setPostsData(()=>{
           return [...resData.data]
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
     
    },[authState.isAuthenticated]);
    

    return (
      <div className="home-posts-cont">
       {postsData &&
       postsData.map(post=>{
        return <Post 
        data={post}  
        key={post._id}
        /> 
       })
      }
      </div>
    )
}


