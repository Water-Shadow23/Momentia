import ProfileDataHead from "./ProfileParts/ProfileData";
import {ProfilePostsBody} from "./ProfileParts/ProfilePosts";


export default function Profile() {
  return (
    <>
    <section className="profile-cont">
      <div className="profile-sub">
        <ProfileDataHead />
        <ProfilePostsBody />
      </div>
    </section>
    </>
  );
}
