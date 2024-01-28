import {  Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiHome, HiUser } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { signoutStart, signoutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

function SideBar() {

    const location = useLocation();
    const [tab, setTab] = useState("");

    const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const signoutHandler = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess());
      }

    } catch (error) {
        console.log(error.message);
    }

  }

  return (
    <Sidebar className="w-full md:w-56 " >
      <Sidebar.Items>
        <Sidebar.ItemGroup>

          <Link to={"/"} className="mb-4">
          <Sidebar.Item href="#" icon={HiHome} as='div' >
            Home
          </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=profile"}>
          <Sidebar.Item href="#" active={tab === 'profile'} icon={HiUser} label="user" labelColor="dark" as='div' >
            Profile
          </Sidebar.Item>
          </Link>

          <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={signoutHandler}>
            Sign out
          </Sidebar.Item>
        
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default SideBar