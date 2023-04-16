import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import Youtube from "react-youtube";
import formatDate from "../utils/formatDate.js";
import MainContext from "../useContext/MainContext.jsx";
import trancateString from '../utils/truncateString.js';

const Main = ({ fetchUrl, trailerVideo }) => {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [addMovie, setAddMovie] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { saveMovie } = useContext(MainContext);

  const addMovieToFavourites = useCallback(() => {
    setAddMovie(!addMovie);
    saveMovie(
      selectedMovie.id,
      selectedMovie.title,
      selectedMovie?.backdrop_path
    );
  });

  // main data
  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setSelectedMovie(
          data.results[Math.floor(Math.random() * data.results.length)]
        );
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

  const truncatedOverview = useMemo(
    () => trancateString(selectedMovie?.overview, 150),
    [selectedMovie?.overview]
  );

  const opts = {
    height: "100%", // the height of the player
    width: "100%", // the width of the player
    playerVars: {
      autoplay: 1, // automatically start playing the video when the player loads
      controls: 0, // hide the video player controls
      disablekb: 1, // disable keyboard controls for the player
      modestbranding: 1, // show a small YouTube logo at the bottom of the video player
      playsinline: 1, // allow the video to play inline on mobile devices
      rel: 0, // do not show related videos at the end of the video playback
      loop: 1, // loop the video playback
      title: 0, // hide the video title
      start: 0, // start playing the video at the beginning
      fs: 1, // show fullscreen button in the player
      showinfo: 0, // hide video information, including the video title and uploader information
      iv_load_policy: 3, // do not show video annotations by default
    },
    volume: '0', // set the player volume to 0
  };

  return (
    <main className="text-white relative w-full lg:h-[600px] md:h-[450px] h-[350px] mb-4">
      {/* video */}
      <div className={`absolute top-0 left-0 w-full h-full`}>
        <Youtube
          videoId={trailer}
          iframeClassName="youtube-container"
          opts={opts}
          volume={opts.volume}
        />
      </div>

      {/* layer for video dark-bg */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black"></div>

      {/* text on video */}
      <div className="relative w-full h-full">
        <div className="absolute top-[20%] w-full p-4 md:p-8">

          {/* title of film */}
          <h1 className="sm:text-3xl text-xl md:text-5xl sm:max-w-[450px] max-w-[350px]">
            {selectedMovie?.title}
          </h1>

          {/* buttons play and add */}
          <div className="my-4">
            <Link
              to={`/movie/${selectedMovie?.id}`}
              className="text-black bg-gray-300 hover:opacity-90 border border-gray-300 py-2 px-5 duration-200"
            >
              Play
            </Link>
            <button
              onClick={addMovieToFavourites}
              className="text-white hover:text-white hover:bg-green-400 border border-gray-300 hover:border-transparent  duration-200 active:scale-95 outline-none py-1.5 px-3 ml-4"
            >
              Add to my list
            </button>
          </div>

          {/* date of release*/}
          <p className="text-gray-400 text-md mb-2">{`Released: ${formattedDate}`}</p>

          {/* description of film */}
          <p className="text-sm text-gray-300 md:text-lg sm:max-w-[450px] max-w-[350px]">
            {truncatedOverview}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Main;
