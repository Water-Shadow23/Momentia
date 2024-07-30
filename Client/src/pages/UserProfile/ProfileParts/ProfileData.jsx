import { Link } from "react-router-dom";

export default function ProfileDataHead(){
 
   return (
    <div className="profile-data-cont">
                    
    <div className="profile-photo-cont">
      <div className="profile-photo">
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d733c1e1-d7d1-4f92-9abb-628b1aa5af6a/dfzlns7-c3089e5b-f230-4a67-b56a-706f105c6bed.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MzNjMWUxLWQ3ZDEtNGY5Mi05YWJiLTYyOGIxYWE1YWY2YVwvZGZ6bG5zNy1jMzA4OWU1Yi1mMjMwLTRhNjctYjU2YS03MDZmMTA1YzZiZWQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GER60TdONmCscZ3QvsDf0bVQRk9bsnhdB7FB9RviXK0" alt="" />
      </div>
    </div>
    
   <div className="profile-head">
     <div className="profile-actions">
      <div className="profile-user-name">g_manov_</div>

       <DisownProfileActions /> 

     </div>

     <div className="profile-stats">
      <div className="count-posts profile-text-medium">0 posts</div>
      <div className="count-followers profile-text-medium">56 followers</div>
      <div className="count-following profile-text-medium">142 following</div>
     </div>

     <div className="profile-bio">
       <span className="bio-user-name">George Manov</span>
       <div className="bio-user-job">Cat Lover</div> 
       <div className="bio-text">
        Explore Chow Gar Kung Fu at MyChowGar, your premier online school 📚 for martial arts🥋
        <br />
        25% off your first order
        <br />
        🏷️WELCOM25 coupon👇
      </div> 
      <a target="_blank" href="https://mychowgar.com/best-ultimate-chow-gar-coaching-program/" className="bio-website">https://mychowgar.com/best-ultimate-chow-gar-coaching-program/</a>
      </div>

    </div> 
    
  </div>
   ) 
}

function OwnProfileActions(){
 
    return (
        <>
        <Link to="/" className="grey-btn follow-btn">Edit profile</Link>   

        <Link to="/" className="profile-settings">
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