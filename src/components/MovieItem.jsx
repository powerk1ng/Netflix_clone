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
    <div className="relative h-[240px] inline-block w-[250px] mr-2 md:h-[280px] delay-500">
      <img
        className="object-cover transition duration shadow-xl rounded-md w-full h-full peer"
        src={`https://image.tmdb.org/t/p/w500${(movie?.poster_path ?? movie?.backdrop_path)}`}
        alt={title}
      />
      
      {/* more info on hover img */}
      <div className="opacity-0 flex items-center gap-x-2 absolute bottom-0 bg-zinc-900/50 w-full py-3 pl-2 peer-hover:opacity-100 duration-300 hover:opacity-100">
        <Link
          to={`/movie/${id}`}
          className="w-10 h-10 rounded-full flex justify-center items-center bg-green-400 hover:bg-white"
        >
          <FiPlay className="fill-black" size={20} />
        </Link>

        <button 
          onClick={handleAddToFavourite}
          className="rounded-full w-10 h-10 flex items-center justify-center peer bg-white hover:bg-zinc-200">
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
