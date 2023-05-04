import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Main from "../components/Main.jsx";
import RowCarousel from "../components/RowCarousel";
import MainContext from "../useContext/MainContext.jsx";
import SearchedMovies from "../components/SearchedMovies.jsx";
import NetflixServices from "../utils/NetflixServices";

const Home = () => {
  const NetflixService = new NetflixServices();
  const { searchVal } = useContext(MainContext);
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Home";
    }
  }, []);

  return (
    <div className="bg-[rgba(0,0,0,1)] pb-10">
      {searchVal.length === 0 ? (
        <>
          {/* Main element */}
          <Main />

          {/* carousel- popular movies */}
          <RowCarousel
            title="Popular"
            apiRequestType={NetflixService.requestDataType("popular")}
          />

          {/* carousel - Top rated movies*/}
          <RowCarousel
            title="Top rated"
            apiRequestType={NetflixService.requestDataType("top_rated")}
          />

          {/* carousel - upcoming movies */}
          <RowCarousel
            title="Upcoming"
            apiRequestType={NetflixService.requestDataType("upcoming")}
          />

          {/* carousel - upcoming movies */}
          <RowCarousel
            title="Trending"
            apiRequestType={NetflixService.requestTrending("tv", "week")}
          />
        </>
      ) : (
        // searched movies component
        <SearchedMovies searchVal={searchVal} />
      )}
    </div>
  );
};

export default Home;
