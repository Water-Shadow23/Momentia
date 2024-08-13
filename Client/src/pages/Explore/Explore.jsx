import { Link } from "react-router-dom";
import Comments from "../Comments/Comments.jsx"
import { UseOverlay } from "../../hooks/useOverlay.jsx";
import { errorConstants, overlayConstants } from "../../constants/dispatchConstants.js";
import React, { useEffect, useRef, useState } from "react";
import usePost from "../../hooks/serviceHooks/usePosts.jsx";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import isBadRequest from "../../utils/errorHandler.js";
import { OuterBuilder } from "../../utils/Outer.jsx";
// import {  } from "../../utils/Outer.jsx";


export default function Explore() {

  const { overlayDispatch } = UseOverlay();

  return (
    <>
    <section className="explore">
      <ExploreBody overlayDispatch={overlayDispatch}/> 
    </section>
    </>
  )
}

function ExploreBody({overlayDispatch}) {
  
  const {getAllPosts} = usePost();
  const [postsData,setPostsData] = useState({});
  const errorDispatch = useErrorBoundary();


  useEffect(()=>{
    (async function(){
      try{
        const resData = await getAllPosts();
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
   },[]);
   
   let [postCont,setPostCont] = useState([]); 
   
   useEffect(()=>{

    if(postCont.length){
      postCont = [];
    }
   
    const posts = Object.values(postsData); 
    if(posts.length){

      for(let i = 0 ; i<posts.length;i++){
       if(i%6 === 0){
        postCont.push(
        <ExploreRow key={i}>
          <ExplorePostBox
          overlayDispatch={overlayDispatch}
          data={posts[i]}
          key={posts[i].id} 
          />
        </ExploreRow>
        )
       }else{
        const lastElement = postCont[postCont.length-1];
        const newChildren = React.Children.toArray(lastElement.props.children);
        newChildren.push(
         <ExplorePostBox 
         data={postsData[i]} 
         overlayDispatch={overlayDispatch}
          key={posts[i].id}
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
    <div className="explore-sub">
     {postCont.length ? 
     postCont
     :
     ''   
     }
    </div>
  )
}

function ExploreRow({ children }) {

  return (
    <div className="row-up-5">
      {children}
    </div>
  )
}

function ExplorePostBox({ overlayDispatch, data }) {
  
  const [explorePostData,setExplorePostData] = useState(data);
  const outerActions = OuterBuilder(setExplorePostData);
  delete outerActions.removeOuterSave;

  return (
    <div className="explore-box">
      <div className="box-in"
        onClick={(e) => {
          history.pushState({},'',`/p/${explorePostData.id}`);
          overlayDispatch({
            typeAction: overlayConstants.OPEN,
            component: Comments(explorePostData.id,outerActions),
            typeOverlay: 'Modal'
          });
        }}
      >
        <img src={explorePostData.postImage} alt="" />
        <div className="explore-box-stats">
          <div className="explore-box-likes">
            <i className="fa-regular fa-heart"></i>
            {explorePostData.likes.length}
          </div>
          <div className="explore-box-comments">
            <i className="fa-regular fa-comment"></i>
           {explorePostData.comments || 0}
          </div>
        </div>
      </div>
    </div>
  )
}