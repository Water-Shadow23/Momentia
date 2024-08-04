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



export default function Router() {

  return (
    <>
        <OverlayProvider>
          <Routes>

            <Route element={<Main />}>

             <Route path='/' element={<Home />} />
             <Route path='/explore' element={<Explore />} />

             <Route path='/accaunts' element={<Profile />}>
                 <Route path="" element={<ProfileOwnPosts />} />
                 <Route path="saved" element={<ProfileSavedPosts />} />
             </Route>

             <Route path='/accaunts/edit' element={<ProfileEdit />} />

            </Route>

            <Route element={<Auth />}>

             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             
            </Route>

            <Route element={<Main />}>
             <Route path="*" element={<NotFound />} />
            </Route>  

          </Routes>
        </OverlayProvider> 
    </>
  )
}

