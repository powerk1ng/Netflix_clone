import request from "../utils/request.js";
import Main from "../components/Main.jsx";
import RowCarousel from "../components/RowCarousel";
import { useContext } from "react";
import MainContext from "../useContext/MainContext.jsx";
import SearchedMovies from "../components/SearchedMovies.jsx";

const Home = () => {
  const page = Math.floor(Math.random() * 5 + 1);
  const { searchVal } = useContext(MainContext);

  return (
    <div className="bg-[rgba(0,0,0,1)] pb-10">
      {!searchVal.length ? (
        <>
          {/* Main element */}
          <Main fetchUrl={request.requestData("now_playing", page)} trailerVideo={request.requestSingleMovie} />

          {/* carousel- popular movies */}
          <RowCarousel
            title="Popular"
            fetchUrl={request.requestData("popular", page)}
          />

          {/* carousel - Top rated movies*/}
          <RowCarousel
            title="Top rated"
            fetchUrl={request.requestData("top_rated", page)}
          />

          {/* carousel - upcoming movies */}
          <RowCarousel
            title="Upcoming"
            fetchUrl={request.requestData("upcoming", page)}
          />

          {/* carousel - upcoming movies */}
          <RowCarousel
            title="Trending"
            fetchUrl={request.requestTrending("tv", 'week')}
          />
        </>
      ) : (
        // searched movies
          <SearchedMovies searchVal={searchVal} />
      )}
    </div>
  );
};

export default Home;
