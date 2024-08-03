import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UseOverlay } from "../../../hooks/useOverlay.jsx";
import Comments from "../../Comments/Comments.jsx";
import useTabs from "../../../hooks/useTabs.jsx";
import { tabs } from "../tabData.jsx";

export default function ProfilePostsBody() {

    const {overlayDispatch} = UseOverlay();
 
    return (
        <div className="profile-posts-cont">

            <div className="profile-posts-head">
              <ProfilePostsHeadTabs />
            </div>

            <div className="profile-posts-body">

                <ProfilePostRow>
                    <ProfilePost id='1' />
                    <ProfilePost id='2' />
                    <ProfilePost id='3' />
                </ProfilePostRow>
                <ProfilePostRow>
                    <ProfilePost id='g' />
                    <ProfilePost id='c' />
                    <ProfilePost id='b' />
                </ProfilePostRow>
                <ProfilePostRow>
                    <ProfilePost id='a' />
                    <ProfilePost id='s' />
                    <ProfilePost id='d' />
                </ProfilePostRow>

            </div>

        </div>
    )
}

function ProfilePostsHeadTabs() {
     
    
    const location = useLocation();
    const [activeTab,setActive] = useTabs(tabs);
    

    return (
        <>
         {tabs.map(tab=>
           <Link to={tab.location} key={tab.key} className={tab.className(activeTab.key)}
           onClick={()=>{
            setActive(tab.key,location.pathname)
           }} 
           >
             {tab.children}
           </Link> 
         )}  
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

function ProfilePost({ id }) {

    return (
        <Link to="/" className="profile-box">
            <div className="box-in"
            //onClick={}
            >
            <img src={`https://picsum.photos/1000/1000?${id}`} alt="" />
            
            <div className="profile-post-stats">
                <div className="profile-post-likes post-stat">
                    <i className="fa-regular fa-heart"></i>
                    15.4k
                </div>
                <div className="profile-post-comments post-stat">
                    <i className="fa-regular fa-comment"></i>
                    65
                </div>
            </div>
            </div>
        </Link>
    )
}

function NoPosts() {

    return (
        <div className="noPosts">
            <h2 className="profile-text-big">Share Photos</h2>
            <p className="profile-text-small">When you share photos, they will appear on your profile.</p>
            <Link to='/' className="blue profile-text-medium">Share photos</Link>
        </div>
    )
}

function NoSaved() {

    return (
        <div className="noSaved">
            <h2 className="profile-text-big">Save</h2>
            <p className="profile-text-small">Save photos that you want to see again. No one can see what you've saved.</p>
            <Link to='/' className="blue profile-text-medium">Go to save some photos even now.</Link>
        </div>
    )
}