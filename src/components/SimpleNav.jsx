import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useContext } from "react";
import MainContext from "../useContext/MainContext";


const Header = () => {
  const [navClass, setNavClass] = useState("");
  const {resetSearchInput} = useContext(MainContext)

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 0) {
      setNavClass("bg-black/90");
    } else {
      setNavClass("");
    }
  };

  useEffect(() => {
    handleScroll()

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex justify-between items-center fixed w-full ${navClass} p-4 z-[100] duration-700`}
    >
      <nav>
        <Link to="/" onClick={resetSearchInput}>
          <img className="h-[29px]" src={Logo} alt="netflix-logo" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
