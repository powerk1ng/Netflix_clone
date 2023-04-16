import { AiOutlinePlus } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import {AiOutlineCheck} from 'react-icons/ai';
import MainContext from "../useContext/MainContext";


const MovieItem = ({ id, title, ...movie }) => {
  const {saveMovie} = useContext(MainContext);
  const [like, setLike] = useState(false);

  const handleAddToFavourite = () => {
    setLike(!like);
    saveMovie(id, title, movie?.backdrop_path)
  }

  return (
    <div className="relative inline-block h-[240px] w-[250px] md:h-[280px] mr-2 delay-500">
      <img
        className="w-full h-full object-cover shadow-xl rounded-md transition duration peer"
        src={`https://image.tmdb.org/t/p/w500${(movie?.poster_path ?? movie?.backdrop_path)}`}
        alt={title}
      />
      
      {/* more info on hover img */}
      <div className="bg-zinc-900/50 absolute bottom-0 w-full flex items-center gap-x-2 opacity-0 peer-hover:opacity-100 hover:opacity-100 py-3 pl-2 duration-300">
        <Link
          to={`/movie/${id}`}
          className="w-10 h-10 flex justify-center items-center bg-green-400 hover:bg-white rounded-full"
        >
          <FiPlay className="fill-black" size={20} />
        </Link>

        <button 
          onClick={handleAddToFavourite}
          className=" w-10 h-10 flex items-center justify-center bg-white hover:bg-zinc-200 rounded-full peer">
          {like ? 
          <AiOutlineCheck className="fill-black" size={25} fill="white" />
          :
          <AiOutlinePlus className="fill-black" size={25} fill="white" />}
        </button>
      </div>
    </div>
  );
};

export default MovieItem;
