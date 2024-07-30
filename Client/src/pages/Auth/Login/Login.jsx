import { Link } from "react-router-dom";
import { AuthCont,AuthDown } from "../Auth.jsx";
import LoginForm from "./LoginForm.jsx";

export default function Login(){

    return (
        <>
       <AuthCont>
        <LoginForm />
       </AuthCont> 
       
        <AuthDown>
         <p>Don't have an account?</p>
         <Link to="/register" className="blue">Sign up</Link>
        </AuthDown>
        </>
    )
}