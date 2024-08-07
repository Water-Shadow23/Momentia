import { Link } from "react-router-dom";
import Comments from "../Comments/Comments.jsx"
import { UseOverlay } from "../../hooks/useOverlay.jsx";
import { errorConstants, overlayConstants } from "../../constants/dispatchConstants.js";
import React, { useEffect, useRef, useState } from "react";
import usePost from "../../hooks/serviceHooks/usePosts.jsx";
import useErrorBoundary from "../../hooks/UseErrorBoundary.jsx";
import isBadRequest from "../../utils/errorHandler.js";
import { setOuterData } from "../../utils/util.jsx";


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
          setOuterData={setOuterData(setPostsData)}
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
         setOuterData={setOuterData(setPostsData)}
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

function ExplorePostBox({ overlayDispatch, data , setOuterData }) {

  return (
    <Link to='' className="explore-box">
      <div className="box-in"
        onClick={(e) => {
          overlayDispatch({
            typeAction: overlayConstants.OPEN,
            component: Comments(data._id,setOuterData,overlayDispatch),
            typeOverlay: 'Modal'
          });
        }}
      >
        <img src={data.postImage} alt="" />
        <div className="explore-box-stats">
          <div className="explore-box-likes">
            <i className="fa-regular fa-heart"></i>
            {data.likes.length}
          </div>
          <div className="explore-box-comments">
            <i className="fa-regular fa-comment"></i>
           {data.comments}
          </div>
        </div>
      </div>
    </Link>
  )
}