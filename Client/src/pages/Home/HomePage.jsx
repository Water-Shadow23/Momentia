import { OverlayProvider } from "../../context/OverlayContext.jsx";
import Main from "../../layout/Main.jsx";
import Home from "./Home.jsx";
import HomePosts from './HomePosts.jsx';

export default function HomePage(){

    return (
        <Main>
          <Home>
           <OverlayProvider>
              <HomePosts />
            </OverlayProvider> 
          </Home>
        </Main>
    )
}