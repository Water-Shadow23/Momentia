import { Link } from "react-router-dom"
import { overlayConstants } from "../../constants/dispatchConstants";
import CreatePost from "../CreatePost/CreatePost";


export function NoPosts({ overlayDispatch }) {

    return (
        <div className="noContent-cont">
            <div className="noPosts">
                <h2 className="profile-text-big">Share Photos</h2>
                <p className="profile-text-small">When you share photos, they will appear on your profile.</p>
                <div className="blue profile-text-medium"
                    onClick={() => {
                        overlayDispatch({
                            typeAction: overlayConstants.OPEN,
                            component: CreatePost,
                            typeOverlay: 'Modal',
                        });
                    }}
                >Share photos</div>
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
                <Link to='/explore' className="blue profile-text-medium">Go to save some photos even now.</Link>
            </div>
        </div>
    )
}