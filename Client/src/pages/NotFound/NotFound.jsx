import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Main from "../../layout/Main";


export default function NotFound(){
    const {authState,isAuthStateLoaded} = useContext(AuthContext);
    
    return (
        <>
        {isAuthStateLoaded &&
        <Main>
        <section className="notFound-section">
            <div className="notFound-sub">
               <div className="notFound-sub-in">
                <h1 className="notFound-h">Sorry, this page isn't available.</h1>
                <div className="notFound-link-cont">
                <p className="notFound-p">The link you entered may be broken, or the page may not exist.</p> 
                <Link to='/' replace={true} className="light-aqua-blue-text notFound-link">Go back to Momentia.</Link> 
                </div>
                </div> 
            </div>
        </section>
        </Main>
        }
        </>
    )
}