import {  Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight,  HiChartPie,  HiChatAlt2, HiDocument, HiHome, HiOutlineChatAlt2, HiOutlineDocument, HiOutlinePencilAlt, HiOutlineUser, HiOutlineUsers, HiUser, HiUsers } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { signoutStart, signoutSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function SideBar() {

    const location = useLocation();
    const [tab, setTab] = useState("");

    const {currentUser} = useSelector((state) => state.user);

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
        <Sidebar.ItemGroup className="flex flex-col">

          <Link to={"/"} className="mb-4">
          <Sidebar.Item href="#" icon={HiHome} as='div' >
            Home
          </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=dashboard"}>
          <Sidebar.Item href="#" active={tab === 'dashboard'} icon={HiChartPie}  labelColor="dark" as='div' >
            Dashboard
          </Sidebar.Item>
          </Link>
          <Link to={"/dashboard?tab=profile"}>
          <Sidebar.Item href="#" active={tab === 'profile'} icon={tab === 'profile' ?  HiUser : HiOutlineUser} label={currentUser.isAdmin ? "admin" : "user"} labelColor="dark" as='div' >
            Profile
          </Sidebar.Item>
          </Link>

          {
          currentUser?.isAdmin && 
          <Link to={'/create-post'} >
            <Sidebar.Item href="#" active={tab === 'create-post'} icon={HiOutlinePencilAlt} as='div'>
              Create Post
            </Sidebar.Item>
          </Link>
        }

        {currentUser.isAdmin && (
          <Link to={"/dashboard?tab=posts"}>
          <Sidebar.Item href="#" active={tab === 'posts'} icon={tab !== 'posts' ? HiOutlineDocument : HiDocument}  as='div' >
            My Posts
          </Sidebar.Item>
          </Link>
        )}

        {currentUser.isAdmin && (
          <Link to={"/dashboard?tab=comments"}>
          <Sidebar.Item href="#" active={tab === 'comments'} icon={tab !== 'comments' ? HiOutlineChatAlt2 : HiChatAlt2}  as='div' >
            Comments
          </Sidebar.Item>
          </Link>
        )}

        {currentUser.isAdmin && (
          <Link to={"/dashboard?tab=users"}>
          <Sidebar.Item href="#" active={tab === 'users'} icon={tab !== 'users' ? HiOutlineUsers : HiUsers} label='admin'  labelColor="dark" as='div' >
            Users
          </Sidebar.Item>
          </Link>
        )}

          <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={signoutHandler} className="hover:pl-6 transition-all duration-300">
            Sign out
          </Sidebar.Item>
        
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default SideBar;