import { useContext } from "react";
import HomePosts from "./HomePosts.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";


export default function Home() {
    
    const {authState} = useContext(AuthContext);

    return (
        <section className="home">
            <div className="home-sub home-content">
                <div className="variant-cont">
                    <div className="variant">
                        {authState.isAuthenticated 
                        ?
                        <p>Following</p>
                        :
                        <p>For you</p>
                        }
                    </div>
                </div>
               
              <HomePosts />

            </div>
        </section>
    )
}

