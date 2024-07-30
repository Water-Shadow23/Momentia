import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfilePostsBody() {


    return (
        <div className="profile-posts-cont">

            <div className="profile-posts-head">
              <ProfilePostHeadLinks />
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

function ProfilePostHeadLinks() {

    const [active,setActiveState] = useState({
        key:'posts'
    });

    function setActive(e){
        if(e.currentTarget.id !== active.key){
            setActiveState({
                key:e.currentTarget.id
            })
         }
    }

    return (
        <>
            <Link to="/accaunts/" 
            className={`profile-box-head ${active.key === 'posts' ? 'profile-box-active' : ''}`} 
            id="posts"
            onClick={(e)=>{
                setActive(e);
            }}
            >
                <span className="material-symbols-outlined">grid_on</span>
                <p>Posts</p>
            </Link>
            <Link to="/accaunts/saved/" 
            className={`profile-box-head ${active.key === 'saved' ? 'profile-box-active' : ''}`}
            id="saved"
            onClick={(e)=>{
               setActive(e);
            }}
            >
                <i className="fa-regular fa-bookmark"></i>
                <p>Saved</p>
            </Link>
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