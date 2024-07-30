import { OverlayProvider } from "../../context/OverlayContext.jsx";
import Main from "../../layout/Main.jsx";
import Explore from "./Explore.jsx";


export default function ExplorePage(){

    return (
        <Main>
        <OverlayProvider>
          <Explore />
        </OverlayProvider>
        </Main>
    )
}