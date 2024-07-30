import { OverlayProvider } from "../../context/OverlayContext";
import Main from "../../layout/Main.jsx";
import Profile from "./Profile.jsx";
import ProfileDataHead from "./ProfileParts/ProfileData";
import ProfilePostsBody from "./ProfileParts/ProfilePosts.jsx";


export default function ProfilePage(){
  
   return(
    <Main>
      <Profile>
        <ProfileDataHead />
          <OverlayProvider>
             <ProfilePostsBody />
          </OverlayProvider>
      </Profile>
    </Main>
   ) 
}