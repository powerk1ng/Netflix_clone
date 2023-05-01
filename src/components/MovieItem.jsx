import { FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddToFavouritesButton from "./UI/AddToFavouritesButton";

const MovieItem = ({ id, title, ...movie }) => {
  
  return (
    <motion.div 
      initial={{opacity: 0}}
      whileInView={{opacity: 1, transition:{duration: 3, type:'spring'}}}
      className="relative inline-block h-[240px] w-[250px] md:h-[280px] mr-2 delay-500">
      {movie.backdrop_path || movie.poster_path ? (
        <img
          className="w-full h-full object-cover shadow-xl rounded-md transition duration peer"
          src={`https://image.tmdb.org/t/p/w500${
            movie.poster_path ?? movie.backdrop_path
          }`}
          alt={title}
        />
      ) : (
        <img
          className="w-full h-[220px]"
          src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        />
      )}

      {/* more info on hover img */}
      <div className="bg-zinc-900/50 absolute bottom-0 w-full flex items-center gap-x-2 opacity-0 peer-hover:opacity-100 hover:opacity-100 py-3 pl-2 duration-300">
        <Link
          to={`/movie/${id}`}
          className="w-10 h-10 flex justify-center items-center bg-green-400 hover:bg-white rounded-full"
        >
          <FiPlay className="fill-black" size={20} />
        </Link>
        <AddToFavouritesButton id={id} title={title} backdrop_path={movie?.backdrop_path}/>
      </div>
    </motion.div>
  );
};

export default MovieItem;
