import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import Youtube from "react-youtube";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate.js";
import MainContext from "../useContext/MainContext.jsx";

const Main = ({ fetchUrl, trailerVideo }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState([null]);
  const [trailer, setTrailer] = useState(null);
  const [addMovie, setAddMovie] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [videoIsOpen, setvideoIsOpen] = useState(false);
  const {saveMovie} = useContext(MainContext);

  const addMovieToFavourites = useCallback(() => {
    setAddMovie(!addMovie);
    saveMovie(selectedMovie.id, selectedMovie.title, selectedMovie?.backdrop_path);
  });

 
  // main data
  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
        setSelectedMovie(data.results[Math.floor(Math.random() * data.results.length)]);
      })
      .catch((error) => setError(error));
  }, []);

  
  // getting movie trailer
  useEffect(() => {
    fetch(trailerVideo(selectedMovie?.id))
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.videos?.results.find(
          (video) =>
            video.name === ("Official Trailer" ?? "Final Trailer") || video.name
        );
        if (trailer) {
          setTrailer(trailer.key);
        }
      });
  }, [movies]);

  const releaseDate = new Date(selectedMovie?.release_date);
  const formattedDate = formatDate(releaseDate);

  const trancateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const truncatedOverview = useMemo(
    () => trancateString(selectedMovie?.overview, 150),
    [selectedMovie?.overview]
  );

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      disablekb: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      loop: 1,
      title: 0,
      start: 0,
      fs: 1,
      showinfo: 0,
      iv_load_policy: 3,
    },
    volume: '0%',
  };

  
  return (
    <main className="text-white h-[600px] w-full relative">
      {/* video */}
      <div className={`w-full h-full absolute top-0 left-0`}>
        <Youtube
          videoId={trailer}
          iframeClassName="youtube-container"
          opts={opts}
          volume={opts.volume}
        />
      </div>
      <div className="absolute w-full h-full bg-gradient-to-r from-black inset-0"></div>
      /
      <div className="w-full h-full relative">
        {/* 
        {movie?.backdrop_path && (
          <img
            className="h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
          />
        )} */}
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl">{selectedMovie?.title}</h1>
          <div className="my-4">
            <Link
              to={`/movie/${selectedMovie?.id}`}
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
            >
              Play
            </Link>
            <button
              onClick={addMovieToFavourites}
              className="border text-white border-gray-300 py-2 px-5 ml-4 md:hover:bg-red-300 md:hover:border-none md:hover:text-white duration-200 md:hover:outline-none"
            >
              Add to my list
            </button>
          </div>
          <p className="text-gray-400 text-md mb-2">{`Released: ${formattedDate}`}</p>
          <p className="w-full  md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-300">
            {truncatedOverview}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Main;
