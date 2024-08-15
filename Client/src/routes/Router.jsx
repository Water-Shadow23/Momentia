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
import PostDetail from "../pages/Comments/PostDetail.jsx";
import AuthGuard from "../components/AuthGuard.jsx";



export default function Router() {
   const {authState} = useContext(AuthContext);

  return (
    <>
          <Routes>

           <Route element={<PersistedAuthState />}>
            <Route element={<Main />}>
              
             <Route path='/' 
            element=
            {         
             <ErrorBoundary> 
              <Home /> 
            </ErrorBoundary>         
            } />
            

             <Route path='/u/:userId' 
             element=
             {
            <AuthGuard access={['u']}> 
             <ErrorBoundary> 
              <Profile /> 
             </ErrorBoundary>
             </AuthGuard>
             } 
             >
                <Route path="" element={<ErrorBoundary> <UserPosts /> </ErrorBoundary>} />

             </Route>
             
             <Route path='/p/:id' 
             element=
            {
              <AuthGuard access={['u']}> 
              <ErrorBoundary> 
              <PostDetail /> 
             </ErrorBoundary>
             </AuthGuard>
            } />             
           
             <Route path='/explore' 
             element=
             {
            <AuthGuard access={['u']}> 
             <ErrorBoundary>
               <Explore /> 
             </ErrorBoundary>
             </AuthGuard>
            } />
             
             <Route path='/accaunts' 
             element=
            {
              <AuthGuard access={['u']}> 
              <ErrorBoundary>
               <Profile /> 
             </ErrorBoundary>
             </AuthGuard>
            } >

             <Route path="" element={<ErrorBoundary> <ProfileOwnPosts /> </ErrorBoundary>} />
             <Route path="saved" element={<ErrorBoundary> <ProfileSavedPosts /> </ErrorBoundary>} />
             
             </Route>
             

           
             <Route path='/accaunts/edit' 
             element=
            {
              <AuthGuard access={['u']}> 
              <ErrorBoundary>
               <ProfileEdit />
              </ErrorBoundary>
              </AuthGuard>
            } />
             
                         
            </Route>
            

            <Route 
              element={
              <AuthGuard access={['g']}> 
              <Auth />
              </AuthGuard>
              }
            >

             <Route path="/login" 
             element=
             {
              <ErrorBoundary> 
              <Login /> 
             </ErrorBoundary>
             } />
             
             <Route path="/register"
              element=
             {
              <ErrorBoundary>
               <Register />
              </ErrorBoundary>
             } />
              
            </Route>

           
           
            <Route path="*" element={<NotFound />} />

           </Route>  

          </Routes>
    </>
  )
}

