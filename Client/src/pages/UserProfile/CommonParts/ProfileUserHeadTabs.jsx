import { Link, useLocation, useParams } from "react-router-dom";
import { tabs } from "../tabData.jsx";



export default function ProfileUserHeadTabs({ activeTab, setActive, UserIsUs }) {


  const location = useLocation();
  const userId = useParams().userId;

  return (
    <>
      {tabs.map(tab => {
        if (!tab.private) {
          if(userId){
            return <div  key={tab.key} className={tab.className(activeTab.key)}
            onClick={() => {
              setActive(tab.key, location.pathname)
            }}
          >
            {tab.children}
          </div>
          }
          return <Link to={tab.location} key={tab.key} className={tab.className(activeTab.key)}
            onClick={() => {
              setActive(tab.key, location.pathname)
            }}
          >
            {tab.children}
          </Link>
        }else if(tab.private && UserIsUs){
          return <Link to={tab.location} key={tab.key} className={tab.className(activeTab.key)}
            onClick={() => {
              setActive(tab.key, location.pathname)
            }}
          >
            {tab.children}
          </Link>
        }
      }
      )}
    </>
  )

}