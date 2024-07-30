import { Link } from "react-router-dom";
import Comments from "../Comments/Comments.jsx"
import { UseOverlay } from "../../hooks/useOverlay.jsx";


export default function Explore() {
    
   const {OpenOverlay} = UseOverlay();

    return (
        <section className="explore">
            <div className="explore-sub">
               <ExploreRow>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={1}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={2}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={3}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={4}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={5}/>
               </ExploreRow>
               <ExploreRow>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={6}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={7}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={8}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={9}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={10}/>
               </ExploreRow>
               <ExploreRow>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={11}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={12}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={13}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={14}/>
                 <ExplorePostBox OpenOverlay={OpenOverlay} id={15}/>
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

function ExplorePostBox({OpenOverlay,id}){
 
  return (
    <Link to="/" className="explore-box">
     <div className="box-in"
      onClick={(e)=>{
        OpenOverlay('Modal',Comments);
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