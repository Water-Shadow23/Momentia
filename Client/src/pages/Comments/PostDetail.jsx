import { useLocation, useNavigate, useParams } from "react-router-dom";
import { overlayConstants } from "../../constants/dispatchConstants";
import { UseOverlay } from "../../hooks/useOverlay";
import Explore from "../Explore/Explore";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import useErrorBoundary from "../../hooks/UseErrorBoundary";
import usePost from "../../hooks/serviceHooks/usePosts";
import Comments from "./Comments";



export default function PostDetail(){
      const postId = useParams().id;
   const {errorDispatch} = useErrorBoundary();
   const {getPostData} = usePost();
    
   
   const EnhancedComments = Comments(postId);
  
    return (
        <>
        <section className="comments-section">
        <EnhancedComments />
        </section>
        </>
    )
   } 