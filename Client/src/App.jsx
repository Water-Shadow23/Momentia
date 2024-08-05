import './assets/css/style.css'
import Router from './routes/Router.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { OverlayProvider } from './context/OverlayContext.jsx';


function App() {



  return (
    <>
     
        <AuthProvider>
            <OverlayProvider>
              <Router />
            </OverlayProvider>
        </AuthProvider>
     
    </>
  )
}

export default App
