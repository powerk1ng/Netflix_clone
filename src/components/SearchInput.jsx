import { useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import MainContext from "../useContext/MainContext";
import { useContext } from "react";

const SearchInput = () => {
  const { searchVal, setSearchVal, setToggleSearch, toggleSearch } =
    useContext(MainContext);
  const location = useLocation();
  const hideSearch = location.pathname === "/mylist";

  const handleSearchVal = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <>
      {!hideSearch && (
        <div
          className={`font-sans text-white flex md:items-center h-9 px-2${
            toggleSearch
              ? "bg-black/70 md:w-[230px] w-[220px] max-[456px]:w-[140px] border-2 border-white duration-700"
              : "w-0 max-md:w-[220px] max-[456px]:w-[140px] border-2 md:border-transparent duration-500"
          }`}
        >
          <label
            htmlFor="search-input"
            className="absolute bg-transparent max-md:right-0 max-md:hidden cursor-pointer"
          >
            <BsSearch
              className={`${
                !toggleSearch ? "md:hover:scale-125 md:duration-400" : ""
              }`}
              onClick={() => setToggleSearch(!toggleSearch)}
              fill="white"
            />
          </label>
          <input
            autoComplete="off"
            onChange={handleSearchVal}
            value={searchVal}
            id="search-input"
            className="text-[12px] bg-transparent w-full h-full pr-2 md:pl-6 pl-2 outline-none"
            type="text"
            placeholder="Search for the movie.."
            required
          />
        </div>
      )}
    </>
  );
};

export default SearchInput;
