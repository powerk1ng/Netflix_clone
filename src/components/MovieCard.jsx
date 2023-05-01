import { Link } from "react-router-dom";
import { Rate } from "antd";
import { FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

import formatDate from "../utils/formatDate";
import AddToFavouritesButton from "./UI/AddToFavouritesButton";

const MovieCard = ({
  id,
  backdrop_path,
  title,
  release_date,
  vote_average,
  poster_path,
}) => {
  const releaseDate = new Date(release_date);

  return (
    // card body
    <motion.div 
      initial={{opacity: 0}}
      whileInView={{opacity: 1, transition: {duration: .5, delay: 0.2}}}
      className="shadow-lg md:shadow-white/40 shadow-green-400  md:hover:shadow-xl md:hover:shadow-green-400 duration-300">
      {/* card top */}
      <div className="w-full h-[220px]">
        {backdrop_path || poster_path ? (
          <img
            className="w-full h-full object-cover rounded-t-md"
            src={`https://image.tmdb.org/t/p/w500${
              backdrop_path ?? poster_path
            }`}
          />
        ) : (
          <img
            className="w-full h-[220px]"
            src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
          />
        )}
      </div>

      {/* card bottom */}
      <div className="font-poppins text-white min-h-[180px] flex flex-col justify-between pt-1 px-2">
        {/* card bottom movie info */}
        <div>
          <h2>{title}</h2>
          <p className="my-2">
            {!releaseDate ? "N/A" : formatDate(releaseDate)}
          </p>
          <div>
            {vote_average > 0 ? vote_average.toFixed(1) : "N/A"}
            <Rate
              className="hover:pointer-events-none ml-2"
              allowHalf
              defaultValue={Math.round(vote_average / 2)}
            />
          </div>
        </div>

        {/* card bottom movie buttons */}
        <div className="w-full flex items-center justify-between hover:opacity-100 py-3 duration-300">
          <Link
            to={`/movie/${id}`}
            className="w-10 h-10 flex justify-center items-center bg-white hover:bg-green-400 active:scale-90 rounded-full duration-300"
          >
            <FiPlay className="fill-black" size={20} />
          </Link>

          {/* add to favourite btn */}
          <AddToFavouritesButton
            id={id}
            title={title}
            backdrop_path={backdrop_path}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
