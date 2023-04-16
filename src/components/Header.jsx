import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { BiMenuAltLeft } from "react-icons/bi";

import Logo from "../assets/logo.png";
import MainContext from "../useContext/MainContext";
import SearchInput from "./SearchInput";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const [navClass, setNavClass] = useState("");
  const { resetSearchInput } = useContext(MainContext);
  const [click, setClick] = useState(false);
  const location = useLocation();
  const myListBgColor = location.pathname === "/mylist";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 0) {
        setNavClass("bg-black/90");
      } else {
        setNavClass("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // open close nav menu
  const menuOpen = () => {
    setClick(!click);
  };

  const handleClickOutsideOfMenu = (e) => {
    if (!e.target.closest("#menu-btn") && !e.target.closest("#nav-menu")) {
      menuOpen();
    }
  };

  // close nav menu on outside click
  useEffect(() => {
    if (!click) {
      return;
    }

    window.addEventListener("click", handleClickOutsideOfMenu);

    return () => {
      window.removeEventListener("click", handleClickOutsideOfMenu);
    };
  }, [click]);

  return (
    <header
      className={`flex justify-between items-center p-4 z-[150] fixed w-full ${navClass} duration-700`}
    >
      <div className="md:flex gap-x-5">
        {/* logo mobile menu body */}
        <div className="flex items-center gap-x-6">
          
          {/* mobile-menu */}
          <div
            onClick={menuOpen}
            id="menu-btn"
            className={`text-white cursor-pointer hidden max-md:block z-[99] ${
              click ? "-rotate-90" : ""
            } duration-500`}
          >
            <BiMenuAltLeft
              className={myListBgColor && click ? "fill-[#b3b3b3]" : "fill-white"}
              size={25}
            />
          </div>

          {/* netflix logo */}
          <Link to="/" onClick={resetSearchInput}>
            <img className="h-[29px]" src={Logo} alt="netflix-logo" />
          </Link>
        </div>

        <nav
          id="nav-menu"
          className={`flex md:items-center ${
            myListBgColor ? "max-md:bg-gray-900" : "max-md:bg-black"
          } nav-mobile ${click ? "max-md:left-0" : "max-md:-left-full"}`}
        >
          <ul
            className={`flex max-md:flex-col lg:gap-x-8 gap-x-5 max-md:gap-y-4 ${
              myListBgColor ? "max-md:text-[#b3b3b3] text-[#b3b3b3]" : "text-[#b3b3b3]"
            } text-[14px] max-md:pt-16 max-md:pl-5`}
          >
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/serials" className="nav-link">
              Tv Shows
            </NavLink>
            <NavLink to="/movies" className="nav-link">
              Movies
            </NavLink>
            <NavLink to="/latest" className="nav-link">
              Latest
            </NavLink>
            <NavLink to="/mylist" className="nav-link">
              My List
            </NavLink>

            {/* logout btn */}
            <LogoutBtn className="max-md:inline-block hidden" />
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-x-5">
        {/* search input*/}
        <SearchInput />

        {/* logout button */}
        <LogoutBtn className="max-md:hidden" />
      </div>
    </header>
  );
};

export default Header;