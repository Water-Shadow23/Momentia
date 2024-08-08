import { useContext } from "react";
import HomePosts from "./HomePosts.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";


export default function Home() {

   const { authState } = useContext(AuthContext);

   return (
      <>
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
                  {!authState.isAuthenticated && 
                  <div className="auth-btns">
                        <Link to='/login' className="auth-btn aqua-btn blue">Login</Link>
                        <Link to='/register' className="auth-btn blue">Register</Link>
                  </div>
                  }
               </div>

               <HomePosts />

            </div>
         </section>
      </>
   )
}

