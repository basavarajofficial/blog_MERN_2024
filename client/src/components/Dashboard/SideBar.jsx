import {  Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiChartPie, HiUser } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";

function SideBar() {

    const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);
  }, [location.search])

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#"  icon={HiChartPie} >
            Dashboard
          </Sidebar.Item>

          <Link to={"/dashboard?tab=profile"}>
          <Sidebar.Item href="#" active={tab === 'profile'} icon={HiUser} label="user" labelColor="dark" >
            Profile
          </Sidebar.Item>
          </Link>

          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign out
          </Sidebar.Item>
        
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default SideBar