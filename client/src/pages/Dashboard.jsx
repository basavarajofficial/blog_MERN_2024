import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import SideBar from "../components/Dashboard/SideBar";
import Profile from "../components/Dashboard/Profile";
import AdminDashboard from "../components/Dashboard/AdminDashboard";

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
        {tab === "profile" && <Profile />}
        {tab === "posts" && <AdminDashboard />}
      </div>
    </div>
  )
}

export default Dashboard