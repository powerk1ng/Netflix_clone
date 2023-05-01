import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import Logo from "../assets/logo.png";
import MainContext from "../useContext/MainContext";

const Header = () => {
  const [scrollY, setScrollY] = useState(false);
  const { resetSearchInput } = useContext(MainContext);

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    scrollPos > 0 ? setScrollY(true) : setScrollY(false)
  };

  useEffect(() => {
    handleScroll();    

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex justify-between items-center fixed w-full ${
        scrollY ? "bg-black/90" : ""
      } p-4 z-[100] duration-700`}
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
