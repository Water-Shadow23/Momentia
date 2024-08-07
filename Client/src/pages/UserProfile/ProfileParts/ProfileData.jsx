import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useUser } from "../../../hooks/serviceHooks/useUser";

export default function ProfileDataHead(){
   const {authState} = useContext(AuthContext);
   const [profileData,setProfileData] = useState();
   const {getData,getUserData} = useUser();

   const params = useParams();
   let UserIsUs = useRef(!params.hasOwnProperty('userId')); 
   const userId = params.userId;
   
   useEffect(()=>{
    UserIsUs.current = !params.hasOwnProperty('userId')
    if(authState.isAuthenticated){
      (async function(){
        try{
         let profileResData;
         if(UserIsUs.current){
          profileResData = await getData();
         }
         else{
          profileResData = await getUserData(userId);
         } 
         setProfileData(()=>profileResData.data); 
        }catch(err){
   
        } 
      })() 
    }

    return ()=>{
      setProfileData();
    }

   },[authState,params.userId])
   
   

   return (
    <>
    
    <div className="profile-data-cont">
                    
    <div className="profile-photo-cont">
      <div className="profile-photo">
        <img src={profileData?.profilePhoto || ''} alt="" />
      </div>
    </div>
    
   <div className="profile-head">
     <div className="profile-actions">
      <div className="profile-user-name">{profileData?.username}</div>

       {UserIsUs.current ? 
       <OwnProfileActions /> 
       :
       <DisownProfileActions />
      }    

     </div>
     
     <div className="profile-stats">
      <div className="count-posts profile-text-medium">{profileData?.posts} posts</div>
      <div className="count-followers profile-text-medium">{profileData?.followers.length} followers</div>
      <div className="count-following profile-text-medium">{profileData?.following.length} following</div>
     </div>

     <div className="profile-bio">
       <span className="bio-user-name">{profileData?.fullName}</span>
       <div className="bio-user-job">{profileData?.job}</div> 
       <div className="bio-text">
        {profileData?.bio}
      </div> 
      <a target="_blank" href={`${profileData?.website}`} className="bio-website">{profileData?.website}</a>
      </div>

    </div> 
    
  </div>
  
  </>
   ) 
}

function OwnProfileActions(){
 
    return (
        <>
        <Link to="/accaunts/edit" className="grey-btn follow-btn">Edit profile</Link>   

        <Link to="/accaunts/edit" className="profile-settings">
          <i className="fa-solid fa-gear profile-head-icon"></i>
        </Link>
        </>
    )
}

function DisownProfileActions(){

   return (
    <>
    <div className="blue-btn follow-btn">Follow</div> 
    {/* <div className="grey-btn follow-btn">Following</div>  */}

      {/* <svg aria-label="Options" className="three-dots" 
     role="img" 
     viewBox="0 0 24 24"
     > 
    <title>Options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle>
    </svg> */}
    </>
   )
}