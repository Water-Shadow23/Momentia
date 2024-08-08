import { UseOverlay } from '../../hooks/useOverlay.jsx';
import useImageUpload from '../../hooks/useImageUpload.jsx';
import { useContext, useEffect, useState } from 'react';
import EditForm from './Form/EditForm.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useUser } from '../../hooks/serviceHooks/useUser.jsx';


export default function ProfileEdit() {
     
    //instead of directly changing the photo , add overlay and do it from there
    
    const {authState} = useContext(AuthContext);
    const [imagePreviewUrl,setImageUploadState,processFile] = useImageUpload()
    const [imageUrl,setImageUrl] = useState('');
    const [profileData,setProfileData] = useState();
    const {getData,edit} = useUser();
    
    async function handleFileChange(e){
      const [imageUrl] = await processFile(e);
      setImageUploadState(setImageUrl,{
       data:{
        imageUrl:imageUrl
       }  
      });
      try{
       await edit({
        profilePhoto:imageUrl
       });
      }catch(err){

      }
    }

   useEffect(()=>{
     if(authState.isAuthenticated){
      (async function(){
         try{
          const profileResData = await getData();
          setProfileData(()=>profileResData.data);
         }catch(err){

         }
      })()
     }
   },[authState])  

    return (
        <>


        <section className="edit-profile">
            <div className="edit-profile-sub">
                <div className="edit-head-text">
                    <p className="edit-profile-text-big">Edit profile</p>
                </div>
                {profileData && 
                <div className="upload-profile-img-cont">
                   
                    <div className="edit-profile-img">
                        <img src={imagePreviewUrl || profileData?.profilePhoto} alt="" />
                    </div>
                    <div className="edit-profile-username">{profileData.username}</div>
                       
                     <label htmlFor="file-profile" className="blue-btn">Change Photo</label> 
                    <input type='file' id='file-profile' 
                     onChange={handleFileChange}
                     accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
                    />

                </div>
                } 
               {
               profileData && 
              <EditForm data={profileData}/>
               }

            </div>
        </section>
        </>
    )
}

