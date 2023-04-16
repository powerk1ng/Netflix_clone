import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import request from "../utils/request.js";
import MovieCard from "./MovieCard.jsx";

const SearchedMovies = ({ searchVal }) => {
  const [searchData, setSearchData] = useState([]);
  const [debouncedSearchVal] = useDebounce(searchVal, 800);

  useEffect(() => {
    fetch(request.requestSearch(debouncedSearchVal))
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data.results);
      });
  }, [debouncedSearchVal]);

  return (
    <div className="text-white bg-black/70 w-full min-h-screen">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-10 gap-y-20 pt-24 px-5">
        {searchData.length > 0 ? (
          searchData.map((item) => <MovieCard key={item.id} {...item} />)
        ) : searchVal.length > 1 ? (
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-3xl font-bold mb-2">Nothing found</p>
            <p className="text-lg">Please try another search term</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchedMovies;
