import { Avatar, Button, Dropdown, Navbar, Spinner, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutStart, signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  
    const { currentUser, loading } = useSelector((state) => state.user);
    const { theme, } = useSelector((state) => state.theme);
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromURL = urlParams.get("searchTerm");
      if(searchTermFromURL){
        setSearchTerm(searchTermFromURL);
      }
    }, [location.search]);



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) { // Change 100 to your desired scroll position
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


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

  const searchHandleSubmit = async(e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    
  }

 

  return (
    <Navbar id="navBar" className={isSticky ? 'sticky' : ''} fluid rounded>
      <Logo />

      <form onSubmit={searchHandleSubmit}>
        <TextInput
          type="text"
          className="hidden sm:inline"
          placeholder="search"
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Link to={`/search`}>
      <Button className="sm:hidden w-12 h-9" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      </Link>
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
          
            <Link to={ currentUser.isAdmin ? '/dashboard?tab=dashboard' : '/dashboard?tab=profile'}>
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
      <Navbar.Collapse >
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"} className="sm:text-lg text-sm uppercase">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}   className="sm:text-lg text-sm uppercase">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/projects"}  className="sm:text-lg text-sm uppercase">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
