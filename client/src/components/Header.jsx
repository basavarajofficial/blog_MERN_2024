import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

function Header() {
  const path = useLocation().pathname;

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  console.log(currentUser);

  return (
    <Navbar fluid rounded className="border-b-2 bg-transparent">
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
        <Button className="hidden sm:inline w-12 h-10" color="gray" pill onClick={() => dispatch(toggleTheme())}>
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
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
              {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
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
