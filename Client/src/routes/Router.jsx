import { Routes, Route } from "react-router-dom";
import Main from "../layout/Main.jsx";
import Auth from "../layout/Auth.jsx";

import Home from "../pages/Home/Home.jsx";
import Explore from "../pages/Explore/Explore.jsx";
import Profile from "../pages/UserProfile/Profile.jsx";
import ProfileEdit from "../pages/EditProfile/Edit.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import Register from "../pages/Auth/Register/Register.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import { ProfileOwnPosts, ProfileSavedPosts, UserPosts } from "../pages/UserProfile/ProfileParts/ProfilePosts.jsx";
import { ErrorBoundary } from "../context/ErrorBoundaryContext.jsx";
import PersistedAuthState from "../components/PersistedAuthState.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";



export default function Router() {
   const {authState} = useContext(AuthContext);

  return (
    <>
          <Routes>

           <Route element={<PersistedAuthState />}>
            <Route element={<Main />}>
              
             <Route path='/' element={<ErrorBoundary> <Home /> </ErrorBoundary>} />
             
             {authState.isAuthenticated &&
             <Route path='/:userId' element={<ErrorBoundary> <Profile /> </ErrorBoundary>} >
                <Route path="" element={<ErrorBoundary> <UserPosts /> </ErrorBoundary>} />
             </Route>
             }

            {authState.isAuthenticated && 
             <Route path='/explore' element={<ErrorBoundary> <Explore /> </ErrorBoundary>} />
            }

             {authState.isAuthenticated && 
             <Route path='/accaunts' element={<ErrorBoundary> <Profile /> </ErrorBoundary>} >
                 <Route path="" element={<ProfileOwnPosts />} />
                 <Route path="saved" element={<ProfileSavedPosts />} />
             </Route>
             }

             {authState.isAuthenticated && 
             <Route path='/accaunts/edit' element={<ErrorBoundary> <ProfileEdit /> </ErrorBoundary>} />
             }
             
             <Route path="*" element={<NotFound />} />
             
            </Route>
           </Route>  

            <Route element={<Auth />}>

             <Route path="/login" element={<ErrorBoundary> <Login /> </ErrorBoundary>} />
             <Route path="/register" element={<ErrorBoundary> <Register /> </ErrorBoundary>} />

            </Route>

           
          </Routes>
    </>
  )
}

