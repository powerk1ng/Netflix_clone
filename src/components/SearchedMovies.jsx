import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";
import { container } from "../utils/motionVariants.js";

import MovieCard from "./MovieCard.jsx";
import NetflixServices from "../utils/NetflixServices.js";

const SearchedMovies = ({ searchVal }) => {
  const [searchData, setSearchData] = useState([]);
  const [debouncedSearchVal] = useDebounce(searchVal, 800);
  const NetflixService = new NetflixServices();

  
  useEffect(() => {
    NetflixService.requestSearch(debouncedSearchVal)
      .then((data) => {
        setSearchData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [debouncedSearchVal]);

  return (
    <div className="text-white bg-black/70 w-full min-h-screen">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-10 gap-y-20 pt-24 px-5">
        {searchData.length > 0 ? (
          searchData.map((item) => <MovieCard key={item.id} {...item} />)
        ) : searchVal.length > 1 ? (
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-3xl font-bold mb-2">Nothing found</p>
            <p className="text-lg">Please try another search term</p>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default SearchedMovies;
