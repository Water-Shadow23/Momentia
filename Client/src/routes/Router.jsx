import { Routes, Route } from "react-router-dom";
import { OverlayProvider } from "../context/OverlayContext.jsx";
import Main from "../layout/Main.jsx";
import Auth from "../layout/Auth.jsx";

import Home from "../pages/Home/Home.jsx";
import Explore from "../pages/Explore/Explore.jsx";
import Profile from "../pages/UserProfile/Profile.jsx";
import ProfileEdit from "../pages/EditProfile/Edit.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import Register from "../pages/Auth/Register/Register.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import { ProfileOwnPosts, ProfileSavedPosts } from "../pages/UserProfile/ProfileParts/ProfilePosts.jsx";
import { ErrorBoundary } from "../context/ErrorBoundaryContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";



export default function Router() {

  return (
    <>
       <AuthProvider>   
        <OverlayProvider>
          <Routes>

            <Route element={<Main />}>

             <Route path='/' element={<ErrorBoundary> <Home /> </ErrorBoundary>} />

             <Route path='/explore' element={<ErrorBoundary> <Explore /> </ErrorBoundary>} />

             <Route path='/accaunts' element={<ErrorBoundary> <Profile /> </ErrorBoundary>} >
                 <Route path="" element={<ProfileOwnPosts />} />
                 <Route path="saved" element={<ProfileSavedPosts />} />
             </Route>

             <Route path='/accaunts/edit' element={<ErrorBoundary> <ProfileEdit /> </ErrorBoundary>} />

            </Route>

            <Route element={<Auth />}>

             <Route path="/login" element={<ErrorBoundary> <Login /> </ErrorBoundary>} />
             <Route path="/register" element={<ErrorBoundary> <Register /> </ErrorBoundary>} />

            </Route>

            <Route element={<Main />}>
             <Route path="*" element={<NotFound />} />
            </Route>  

          </Routes>
        </OverlayProvider> 
       </AuthProvider> 
    </>
  )
}

