import { Avatar, Button, Dropdown, Navbar, Spinner, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutStart, signoutSuccess } from "../redux/user/userSlice";

function Header() {
  const path = useLocation().pathname;

  const { currentUser, loading } = useSelector((state) => state.user);
  const { theme, } = useSelector((state) => state.theme);
  const dispatch = useDispatch();


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

  // window.addEventListener("scroll", () => {
  //   if(window.scrollY > 70){
  //     document.getElementById("navBar").classList.add("sticky");
  //   }else{
  //     document.getElementById("navBar").classList.remove("sticky");
  //   }
  // })

  return (
    <Navbar id="navBar" fluid rounded className="border-b-2">
      <Logo />

      <form>
        <TextInput
          type="text"
          className="hidden sm:inline"
          placeholder="search"
          rightIcon={AiOutlineSearch}
        />
      </form>
      <Button className="sm:hidden w-12 h-9" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="inline w-12 h-10" color="gray" pill onClick={() => dispatch(toggleTheme())}>
          {(theme === "dark") ? (<FaSun />) : (<FaMoon />) }
          
        </Button>

        {currentUser ? (
          <Dropdown className="shadow-lg"
            arrowIcon={false}
            inline
            
            label={
              <Avatar
                img={currentUser.profilePicture}
                alt="avatar"
                rounded
                bordered
                className="bg-gray-100 rounded-full"
              />
            }
          >

            {loading ? (
              <Spinner aria-label="Default status example" />
            ) : (
              <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
              {currentUser.email}
              </span>
            </Dropdown.Header>
            )}
           
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            
            <Dropdown.Divider />
            <Dropdown.Item onClick={signoutHandler}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={"/signin"}>
            <Button gradientDuoTone="purpleToBlue" outline>
              Login
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
