


export function AuthDown({ children }) {

    return (
        <div className="auth-in-box auth-down">
            <div className="auth-down-text">
               {children}
            </div>
        </div>
    )
}

export function AuthCont({ children }) {

    return (
        <div className="auth-in-box auth-cont">
          <div className="logo-cont">
              <h1 className="logo">Momentia</h1>                    
          </div>
          
          {children}

         </div>             
    )
}