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
          className={`${
            toggleSearch
              ? "lg:w-[220px] w-[165px] border-2 border-white bg-black/70 duration-700"
              : "md:w-[0] w-[230px] max-[420px]:w-[170px] border-2 md:border-transparent duration-500"
          } items-center h-9 flex px-2  text-white font-sans`}
        >
          <label
            htmlFor="search-input"
            className="max-md:hidden absolute cursor-pointer bg-transparent max-md:right-0"
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
            className="md:pl-6 text-[12px] pr-2 outline-none w-full h-full bg-transparent"
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
