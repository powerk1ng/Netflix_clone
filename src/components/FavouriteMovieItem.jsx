import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import { useState, useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import { item } from '../utils/motionVariants.js';

import MainContext from "../useContext/MainContext";
import ModalWindow from "./ModalWindow";

const FavouriteMovieItem = ({ img, title, id, movies }) => {

  const { user } = useContext(MainContext);
  const [modalIsOpen, setModalIsopen] = useState(false);

  const setModal = () => {
    setModalIsopen(!modalIsOpen);
  };

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteMovie = async (passedId) => {
    try {
      const result = movies.filter((item) => item.id !== passedId);
      await updateDoc(movieRef, {
        savedShows: result,
      });
      setModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      variants={item}
      className="shadow-lg md:shadow-white/40 shadow-green-400  md:hover:shadow-xl md:hover:shadow-green-400 duration-300">
      <ModalWindow
        modalIsOpen={modalIsOpen} 
        setModalIsOpen={setModalIsopen}
        setModal={setModal}
        deleteMovie={() => deleteMovie(id)}
      />
      <div className="w-full h-[250px]">
        <img
          className="w-full h-full object-cover rounded-t-md"
          src={
            `https://image.tmdb.org/t/p/w500${img}` ??
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
          }
        />
      </div>

      {/* card bottom */}
      <div className="font-poppins bg-black/70 border-b-2 rounded-b-md p-2 min-h-[130px] flex flex-col justify-between">
        <h2>{title}</h2>
        {/* buttons */}
        <div className="flex items-center w-full py-3 px-2 duration-300 hover:opacity-100 justify-between">
          <Link
            to={`/movie/${id}`}
            className="w-10 h-10 rounded-full flex justify-center items-center bg-white hover:bg-green-400 active:scale-90 duration-300"
          >
            <FiPlay className="fill-black" size={20} />
          </Link>

          <button
            onClick={setModal}
            className="w-10 h-10 rounded-full flex justify-center items-center bg-white hover:bg-green-400 text-black font-bold active:scale-90 duration-300"
          >
            X
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FavouriteMovieItem;
