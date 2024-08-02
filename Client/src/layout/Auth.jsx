import { Outlet } from "react-router-dom";


export default function Auth(){

    return (
     <section className="auth-section">
       <div className="auth-sub">
       
       <div className="auth-cont-box">
          <Outlet />
        </div>
       </div>
     </section>   
    )
}