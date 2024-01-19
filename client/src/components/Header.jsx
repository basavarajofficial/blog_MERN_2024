import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar fluid rounded className="border-b-2 bg-transparent">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-[rgba(0,152,43,1)] via-[rgb(32,12,43)] to-[rgba(0,212,255,1)] rounded-xl text-white">
          TECH
        </span>
        Blogs
      </Link>

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
        <Button className="hidden sm:inline w-12 h-10" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to={"/signin"}>
          <Button gradientDuoTone="purpleToBlue" outline>Login</Button>
        </Link>
        <Navbar.Toggle />
        </div>
        <Navbar.Collapse >
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to={"/"}>
                Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to={"/about"}>
                About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to={"/projects"}>
                Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
     
    </Navbar>
  );
}

export default Header;
