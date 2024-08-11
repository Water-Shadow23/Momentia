import { memo } from "react";
import ProfileDataHead from "./ProfileParts/ProfileData";
import {ProfilePostsBody} from "./ProfileParts/ProfilePosts";


export default function Profile() {
  const ProfileDataHead1 = memo(ProfileDataHead);
  const ProfileDataBody1 = memo(ProfilePostsBody);
  
  return (
    <>

    <section className="profile-cont">
      <div className="profile-sub">
        <ProfileDataHead1 />
        <ProfileDataBody1 />
      </div>
    </section>
    </>
  );
}
