import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { UseOverlay } from "../../../hooks/useOverlay.jsx";
import Comments from "../../Comments/Comments.jsx";
import useTabs from "../../../hooks/useTabs.jsx";
import { tabs } from "../tabData.jsx";
import  {useUser}  from "../../../hooks/serviceHooks/useUser.jsx";

import { AuthContext } from "../../../context/AuthContext.jsx";
import ProfileUserHeadTabs from "../CommonParts/ProfileUserHeadTabs.jsx";
import { overlayConstants } from "../../../constants/dispatchConstants.js";
import { NoPosts, NoSaved } from "../NoContent.jsx";
import { OuterBuilder } from "../../../utils/Outer.jsx";

export  function ProfilePostsBody() {
     
    const params = useParams();
    const UserIsUs = !params.hasOwnProperty('userId'); 
    const userId = params.userId;
    

    const {authState} = useContext(AuthContext);
    const [activeTab, setActive] = useTabs(tabs);
    let [posts,setPosts] = useState();
    const {getOwnPosts,getSavedPosts,getUserPosts} = useUser();

    const outerActions = OuterBuilder(setPosts);
    const removeOuterSave = outerActions.removeOuterSave;

    useEffect(()=>{  
    if(authState.isAuthenticated){
      
      //check whether a tab location has changed
      //abstract this into its own method in useTabs hook in future
      if((activeTab.key==='saved' 
        && activeTab.location!=='/accaunts/saved')
       ||
       (activeTab.key==='posts' 
        && activeTab.location!=='/accaunts')
      ){
        setPosts(null)
      }

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
 

    return (
      <>
        
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
                   removeOuterSave
                }}
                />
            </div>

        </div>
         
      </>
    )
}

export function ProfileSavedPosts() {
    const {postsData,removeOuterSave} = useOutletContext();
    const {overlayDispatch} = UseOverlay();
    let [postCont,setPostCont] = useState({
      status:'initial',
      data:[]
    });
   
    //useEffect for putting the records into rows
    //abstract this into its own hook in future
    useEffect(()=>{
        
        if(postCont.data.length){
            postCont.data = [];
        }

        if(postsData?.length){
            
    
          for(let i = 0 ; i<postsData.length;i++){
           if(i%3 === 0){
            postCont.data.push(
            <ProfilePostRow key={i}>
              <ProfilePost
              overlayDispatch={overlayDispatch}
              data={postsData[i]}
              key={postsData[i].id}
              removeOuterSave={removeOuterSave} 
              />
            </ProfilePostRow>
            )
           }else{
            const lastElement = postCont.data[postCont.data.length-1];
            const newChildren = React.Children.toArray(lastElement.props.children);
            newChildren.push(
             <ProfilePost 
             data={postsData[i]} 
             overlayDispatch={overlayDispatch}
              key={postsData[i].id}
              removeOuterSave={removeOuterSave}
             />
            )
    
            postCont.data[postCont.data.length-1] = React.cloneElement(
              lastElement,
              {key:lastElement.key},
              ...newChildren
            )
      
           }
          } 
    
        }
    
        setPostCont(()=>({
          ...postCont,
          status:'fulfilled'
        }));
    
       },[postsData]) 


       if(postsData){
        if(postCont.status==='fulfilled'){
         if(postCont.data.length){
          return (
           postCont.data
          ) 
         }else{
          return <NoSaved />
         }
        }
      }
}

export function ProfileOwnPosts() {
    const {postsData} = useOutletContext();
    const {overlayDispatch} = UseOverlay();
    let [postCont,setPostCont] = useState({
      status:'initial',
      data:[]
    }); 

    useEffect(()=>{
        
        if(postCont.data.length){
            postCont.data = [];
        }

        if(postsData?.length){
               
          for(let i = 0 ; i<postsData.length;i++){
           if(i%3 === 0){
            postCont.data.push(
            <ProfilePostRow key={i}>
              <ProfilePost
              overlayDispatch={overlayDispatch}
              data={postsData[i]}
              key={postsData[i].id} 
              />
            </ProfilePostRow>
            )
           }else{
            const lastElement = postCont.data[postCont.data.length-1];
            const newChildren = React.Children.toArray(lastElement.props.children);
            newChildren.push(
             <ProfilePost 
             data={postsData[i]} 
             overlayDispatch={overlayDispatch}
              key={postsData[i].id}
             />
            )
    
            postCont.data[postCont.data.length-1] = React.cloneElement(
              lastElement,
              {key:lastElement.key},
              ...newChildren
            )
      
           }
          } 
    
        }
    
        setPostCont(()=>({
         ...postCont,
         status:'fulfilled'
        }));
    
       },[postsData])

    
   if(postsData){
     if(postCont.status==='fulfilled'){
      if(postCont.data.length){
       return (
        postCont.data
       ) 
      }else{
       return <NoPosts />
      }
     }
   }
}


export function UserPosts(){
  const {postsData} = useOutletContext();
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

function ProfilePost({ data  , overlayDispatch , removeOuterSave }) {
   
   const [profilePostData,setProfilePostData] = useState(data);
   const outerActions = OuterBuilder(setProfilePostData)
   if(removeOuterSave){
     outerActions.removeOuterSave = removeOuterSave
   }else{
    delete outerActions.removeOuterSave;
   }

    return (
        <div  className="profile-box">
            <div className="box-in"
            onClick={()=>{

              overlayDispatch({
                typeAction:overlayConstants.OPEN,
                component:Comments(profilePostData.id,outerActions),
                typeOverlay:'Modal' 
              })  
              history.pushState({},'',`/p/${profilePostData.id}`);
            }}
            >
                <img src={profilePostData.postImage} alt="" />

                <div className="profile-post-stats">
                    <div className="profile-post-likes post-stat">
                        <i className="fa-regular fa-heart"></i>
                        {profilePostData.likes.length}
                    </div>
                    <div className="profile-post-comments post-stat">
                        <i className="fa-regular fa-comment"></i>
                        {profilePostData.comments || 0}
                    </div>
                </div>
            </div>
        </div>
    )
}

