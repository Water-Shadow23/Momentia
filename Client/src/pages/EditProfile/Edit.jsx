import { UseOverlay } from '../../hooks/useOverlay.jsx';
import useImageUpload from '../../hooks/useImageUpload.jsx';
import { useState } from 'react';
import EditForm from './Form/EditForm.jsx';

export default function EditProfile() {
     
    //instead of directly changing the photo add overlay and do it from there
    // const {OpenOverlay,CloseOverlay,isOpen} = UseOverlay();
    const [imagePreviewUrl,setImageUploadState,processFile] = useImageUpload()
    const [imageBuffer,setImageBuffer] = useState('');
    
    async function handleFileChange(e){
      const [imageUrl,imageBuffer] = await processFile(e);
      setImageUploadState(setImageBuffer,{
       data:{
        imageUrl:imageUrl,
        imageBuffer:imageBuffer
       }  
      });
    }

    return (
        <section className="edit-profile">
            <div className="edit-profile-sub">
                <div className="edit-head-text">
                    <p className="edit-profile-text-big">Edit profile</p>
                </div>
                <div className="upload-profile-img-cont">

                    <div className="edit-profile-img">
                        <img src={imagePreviewUrl} alt="" />
                    </div>
                    <div className="edit-profile-username">g_manov_</div>
                       
                     <label htmlFor="file-profile" className="blue-btn">Change Photo</label> 
                    <input type='file' id='file-profile' 
                     onChange={handleFileChange}
                     accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
                    />

                </div>
               
              <EditForm />

            </div>
        </section>
    )
}

