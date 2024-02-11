import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import SideBar from "../components/Dashboard/SideBar";
import Profile from "../components/Dashboard/Profile";
import UsersAll from "../components/Dashboard/UsersAll";
import AdminComments from "../components/Dashboard/AdminComments";
import AdminPosts from "../components/Dashboard/AdminPosts";
import DashboardBox from "../components/Dashboard/DashboardBox";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/** sidebar */}
      <div className="md:w-56">
        <SideBar />
      </div>

      {/* profile */}
      <div className="w-full min-h-screen">
        {tab === "dashboard" && <DashboardBox />}
        {tab === "profile" && <Profile />}
        {tab === "posts" && <AdminPosts />}
        {tab === "comments" && <AdminComments />}
        {tab === "users" && <UsersAll />}
      </div>
    </div>
  )
}

export default Dashboard