import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

import request from "../utils/request.js";
import SimpleNav from "../components/SimpleNav.jsx";
import Youtube from "react-youtube";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes(movie?.id)) {
      document.title = movie?.original_title
    }
    console.log();
  }, [movie])

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      start: 1,
    },
  };


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(request.requestSingleMovie(id))
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          const trailerVideo = data.videos?.results.find(
            (video) =>
              video.name === ("Official Trailer" ?? "Final Trailer") ||
              video.name
          );
          
          if (trailerVideo) {
            setTrailer(trailerVideo.key);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }, 1500);
  }, []);

  return (
    <>
      {loading && (
        <div className="w-full h-screen bg-black flex justify-center items-center">
          <MoonLoader color="red" speedMultiplier={0.5} size={40} />
        </div>
      )}
      {!loading && (
        <>
          <SimpleNav />
          <div className="min-h-screen overflow-hidden relative flex w-full">
            <Youtube
              videoId={trailer}
              iframeClassName="youtube-container"
              opts={opts}
              volume={opts.volume}
            />
          </div>
        </>
      )}
    </>
  );
};

export default SingleMovie;
