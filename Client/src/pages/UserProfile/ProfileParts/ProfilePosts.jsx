import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import { UseOverlay } from "../../../hooks/useOverlay.jsx";
import Comments from "../../Comments/Comments.jsx";
import useTabs from "../../../hooks/useTabs.jsx";
import { tabs } from "../tabData.jsx";
import  {useUser}  from "../../../hooks/serviceHooks/useUser.jsx";

import { AuthContext } from "../../../context/AuthContext.jsx";
import ProfileUserHeadTabs from "../CommonParts/ProfileUserHeadTabs.jsx";
import { overlayConstants } from "../../../constants/dispatchConstants.js";
import { NoPosts, NoSaved } from "../NoContent.jsx";

export  function ProfilePostsBody() {
     
    const params = useParams();
    const UserIsUs = !params.hasOwnProperty('userId'); 
    const userId = params.userId;
    

    const {authState} = useContext(AuthContext);
    const [activeTab, setActive] = useTabs(tabs);
    const [posts,setPosts] = useState();
    const {getOwnPosts,getSavedPosts,getUserPosts} = useUser();

    useEffect(()=>{
     if(authState.isAuthenticated){
       if(UserIsUs) {
         if(activeTab.key === 'posts' && activeTab.location === '/accaunts'){
           (async function(){
             try{
             const posts =  await getOwnPosts();
             setPosts(()=>{
               return posts.data.posts;  
             });
             }catch(err){
   
             }
           })(); 
         }
         else if(activeTab.key === 'saved' && activeTab.location === '/accaunts/saved'){
           (async function(){
             try{
             const posts = await getSavedPosts();
             setPosts(()=>{
                return posts.data.saved;  
              });
             }catch(err){
   
             }
           })(); 
         }
       }
       else if(!UserIsUs){
        (async function(){
          try{
          const postsResData =  await getUserPosts(userId);
          setPosts(()=>{
            return postsResData.data.posts;  
          });
          }catch(err){

          }
        })(); 
       }
     }   
    },[activeTab,authState])

    function setOuterUserProfileData(){
        function addOuterComment(postId){
         setPosts((preData)=>{
          const post = preData.find((post)=>post._id===postId);
          post.comments = post.comments + 1;   
          return [...preData]  
         });
        }
        function addOuterLike(postId,userId){
         setPosts((preData)=>{
           const post = preData.find((post)=>post._id===postId);
           post.likes.push(userId);
           return [...preData]     
         });
        }
        function removeOuterComment(postId){
            setPosts((preData)=>{
                const post = preData.find((post)=>post._id===postId);
                post.comments = post.comments - 1;
                return [...preData]     
              });
        }
        function removeOuterLike(postId,userId){
            setPosts((preData)=>{
                const post = preData.find((post)=>post._id===postId);
                post.likes = post.likes.filter(likeId=>likeId!==userId);   
                return [...preData] 
               });
        }

        function removeOuterSave(postId){
            setPosts((preData)=>{
                preData = preData.filter(post=>post._id!==postId);   
                return [...preData]  
               });
        }
       
       return {
        addOuterComment,
        addOuterLike,
        removeOuterComment,
        removeOuterLike,
        removeOuterSave
       } 
    } 

    return (
      <>
      {posts &&
        <div className="profile-posts-cont">

            <div className="profile-posts-head">
             
                <ProfileUserHeadTabs 
                UserIsUs={UserIsUs}
                activeTab={activeTab}
                setActive={setActive}
                /> 
            </div>

            <div className="profile-posts-body">
             
               <Outlet 
               context={{
                   postsData:posts,
                   setOuterUserProfileData:setOuterUserProfileData()
                }}
                />
            </div>

        </div>
              }
      </>
    )
}

export function ProfileSavedPosts() {
    const {postsData,setOuterUserProfileData} = useOutletContext();
    const {overlayDispatch} = UseOverlay();
    let [postCont,setPostCont] = useState([]); 
    useEffect(()=>{
        
        if(postCont.length){
            postCont = [];
        }

        if(postsData?.length){
            
    
          for(let i = 0 ; i<postsData.length;i++){
           if(i%3 === 0){
            postCont.push(
            <ProfilePostRow key={i}>
              <ProfilePost
              overlayDispatch={overlayDispatch}
              data={postsData[i]}
              key={postsData[i].id} 
              setOuterUserProfileData={setOuterUserProfileData}
              />
            </ProfilePostRow>
            )
           }else{
            const lastElement = postCont[postCont.length-1];
            const newChildren = React.Children.toArray(lastElement.props.children);
            newChildren.push(
             <ProfilePost 
             data={postsData[i]} 
             overlayDispatch={overlayDispatch}
             setOuterUserProfileData={setOuterUserProfileData}
              key={postsData[i].id}
             />
            )
    
            postCont[postCont.length-1] = React.cloneElement(
              lastElement,
              {key:lastElement.key},
              ...newChildren
            )
      
           }
          } 
    
        }
    
        setPostCont(()=>[...postCont]);
    
       },[postsData]) 

    return (
        <>
         {postsData ? 
          postCont.length ? 
          postCont 
          :
          <NoSaved /> 
        
        :
        '' 
        }
        </>
    )
}


export function ProfileOwnPosts() {
    const {postsData,setOuterUserProfileData} = useOutletContext();
    const {overlayDispatch} = UseOverlay();
    delete setOuterUserProfileData.removeOuterSave ;
    let [postCont,setPostCont] = useState([]); 
    useEffect(()=>{
        
        if(postCont.length){
            postCont = [];
        }
        if(postsData?.length){
            
    
          for(let i = 0 ; i<postsData.length;i++){
           if(i%3 === 0){
            postCont.push(
            <ProfilePostRow key={i}>
              <ProfilePost
              overlayDispatch={overlayDispatch}
              data={postsData[i]}
              key={postsData[i].id} 
              setOuterUserProfileData={setOuterUserProfileData}
              />
            </ProfilePostRow>
            )
           }else{
            const lastElement = postCont[postCont.length-1];
            const newChildren = React.Children.toArray(lastElement.props.children);
            newChildren.push(
             <ProfilePost 
             data={postsData[i]} 
             overlayDispatch={overlayDispatch}
             setOuterUserProfileData={setOuterUserProfileData}
              key={postsData[i].id}
             />
            )
    
            postCont[postCont.length-1] = React.cloneElement(
              lastElement,
              {key:lastElement.key},
              ...newChildren
            )
      
           }
          } 
    
        }
    
        setPostCont(()=>[...postCont]);
    
       },[postsData])

    return (
        <>
        {postsData ? 
          postCont.length ? 
          postCont 
          :
          <NoPosts /> 
        
        :
        '' 
        }
        </>
    )
}

export function UserPosts(){
  const {postsData,setOuterUserProfileData} = useOutletContext();
    const {overlayDispatch} = UseOverlay();
    delete setOuterUserProfileData.removeOuterSave ;
    let [postCont,setPostCont] = useState([]); 
    useEffect(()=>{
        
        if(postCont.length){
            postCont = [];
        }
        if(postsData?.length){
            
    
          for(let i = 0 ; i<postsData.length;i++){
           if(i%3 === 0){
            postCont.push(
            <ProfilePostRow key={i}>
              <ProfilePost
              overlayDispatch={overlayDispatch}
              data={postsData[i]}
              key={postsData[i].id} 
              setOuterUserProfileData={setOuterUserProfileData}
              />
            </ProfilePostRow>
            )
           }else{
            const lastElement = postCont[postCont.length-1];
            const newChildren = React.Children.toArray(lastElement.props.children);
            newChildren.push(
             <ProfilePost 
             data={postsData[i]} 
             overlayDispatch={overlayDispatch}
             setOuterUserProfileData={setOuterUserProfileData}
              key={postsData[i].id}
             />
            )
    
            postCont[postCont.length-1] = React.cloneElement(
              lastElement,
              {key:lastElement.key},
              ...newChildren
            )
      
           }
          } 
    
        }
    
        setPostCont(()=>[...postCont]);
    
       },[postsData])

    return (
        <>
        {postsData ? 
          postCont.length ? 
          postCont 
          :
          '' 
        :
        '' 
        }
        </>
    )
}

function ProfilePostRow({ children }) {

    return (
        <div className="profile-post-row">
            {children}
        </div>
    )
}

function ProfilePost({ data , setOuterUserProfileData , overlayDispatch }) {

    return (
        <div  className="profile-box">
            <div className="box-in"
            onClick={()=>{

              overlayDispatch({
                typeAction:overlayConstants.OPEN,
                component:Comments(data._id,setOuterUserProfileData,overlayDispatch),
                typeOverlay:'Modal' 
              })  
            }}
            >
                <img src={data.postImage} alt="" />

                <div className="profile-post-stats">
                    <div className="profile-post-likes post-stat">
                        <i className="fa-regular fa-heart"></i>
                        {data.likes.length}
                    </div>
                    <div className="profile-post-comments post-stat">
                        <i className="fa-regular fa-comment"></i>
                        {data.comments}
                    </div>
                </div>
            </div>
        </div>
    )
}

