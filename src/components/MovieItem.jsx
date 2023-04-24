import { AiOutlinePlus } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import MainContext from "../useContext/MainContext";

const MovieItem = ({ id, title, ...movie }) => {
  const { saveMovie } = useContext(MainContext);
  const [like, setLike] = useState(false);

  const handleAddToFavourite = () => {
    setLike(!like);
    saveMovie(id, title, movie?.backdrop_path ?? movie?.poster_path);
  };

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

        <motion.button
          onClick={handleAddToFavourite}
          className={`w-10 h-10 flex items-center justify-center rounded-full peer overflow-hidden hover:scale-105 ${!like? 'bg-white' : 'bg-green-400 hover:bg-green-500'} duration-300`} 
        >
          {like ? (
            <AnimatePresence>
              <motion.span
                initial={{opacity: 0, y: '100%'}}
                animate={{opacity: 1, y:0, transition:{delay: .1, duration: .4, type: 'spring', damping: 12}}}>
                <AiOutlineCheck className="fill-white" size={25} fill="white" />
              </motion.span>
            </AnimatePresence>
            
          ) : (
            <motion.span
              initial={{opacity: 0, y: '100%'}}
              animate={{opacity: 1, y:0, transition:{delay: .1, duration: .4, type: 'spring', damping: 9}}}>
                <AiOutlinePlus className="fill-black" size={25} fill="white" />
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MovieItem;
