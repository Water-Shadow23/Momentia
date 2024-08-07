import { Link } from "react-router-dom"


export function NoPosts() {

    return (
       <div className="noContent-cont">
        <div className="noPosts">
            <h2 className="profile-text-big">Share Photos</h2>
            <p className="profile-text-small">When you share photos, they will appear on your profile.</p>
            <Link to='/' className="blue profile-text-medium">Share photos</Link>
        </div>
       </div> 
    )
}

export function NoSaved() {

    return (
        <div className="noContent-cont">
        <div className="noSaved">
            <h2 className="profile-text-big">Save Photos</h2>
            <p className="profile-text-small">Save photos that you want to see again. No one can see what you've saved.</p>
            <Link to='/' className="blue profile-text-medium">Go to save some photos even now.</Link>
        </div>
         </div>   
    )
}