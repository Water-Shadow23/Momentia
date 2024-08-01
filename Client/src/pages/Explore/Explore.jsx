import { Link } from "react-router-dom";
import Comments from "../Comments/Comments.jsx"
import { UseOverlay } from "../../hooks/useOverlay.jsx";
import { overlayConstants } from "../../constants/dispatchConstants.js";


export default function Explore() {
    
   const {overlayDispatch} = UseOverlay();

    return (
        <section className="explore">
            <div className="explore-sub">
               <ExploreRow>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={1}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={2}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={3}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={4}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={5}/>
               </ExploreRow>
               <ExploreRow>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={6}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={7}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={8}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={9}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={10}/>
               </ExploreRow>
               <ExploreRow>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={11}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={12}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={13}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={14}/>
                 <ExplorePostBox overlayDispatch={overlayDispatch} id={15}/>
               </ExploreRow>
            </div>
        </section>
    )
}

function ExploreRow({children}){
 
  return (
    <div className="row-up-5">
        {children}
    </div>
  )
}

function ExplorePostBox({overlayDispatch,id}){
 
  return (
    <Link to="/" className="explore-box">
     <div className="box-in"
      onClick={(e)=>{
        overlayDispatch({
          typeAction:overlayConstants.OPEN,
          component:Comments,
          typeOverlay:'Modal' 
        });
       }}
     >
    <img src={`https://picsum.photos/1000/1000?${id}`} alt="" />
    <div className="explore-box-stats">
      <div className="explore-box-likes">
       <i className="fa-regular fa-heart"></i>
       6k
     </div>
      <div className="explore-box-comments">
       <i className="fa-regular fa-comment"></i>
       1.2k
     </div>
    </div>
    </div>   
   </Link>
  )  
}