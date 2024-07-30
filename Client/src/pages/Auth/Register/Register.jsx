import { Link } from "react-router-dom";
import { AuthCont,AuthDown } from "../Auth.jsx";
import RegisterForm from './RegisterForm.jsx'

export default function Register(){

    return (
        <>
        <AuthCont>
         <RegisterForm />
        </AuthCont>
        
        <AuthDown>
         <p>Have an account?</p>
         <Link to="/login" className="blue">Log in</Link>
        </AuthDown> 
        </>
    )
}