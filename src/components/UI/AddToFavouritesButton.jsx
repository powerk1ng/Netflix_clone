import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { likeBtnMotion } from "../../utils/motionVariants";

import MainContext from "../../useContext/MainContext";

const AddToFavouritesButton = ({ id, title, backdrop_path, poster_path}) => {
  const { saveMovie } = useContext(MainContext);
  const [like, setLike] = useState(false);

  const handleAddToFavourite = () => {
    setLike(!like);
    saveMovie(id, title, (backdrop_path ?? poster_path));
  }; 

  return (
    <motion.button
      onClick={handleAddToFavourite}
      className={`w-10 h-10 flex items-center justify-center rounded-full peer overflow-hidden hover:scale-105 ${
        !like ? "bg-white" : "bg-green-400 hover:bg-green-500"
      } duration-300`}
    >
      {like ? (
        <AnimatePresence>
          <motion.span
            variants={likeBtnMotion}
            initial="hidden"
            animate="show"
          >
            <AiOutlineCheck className="fill-white" size={25} fill="white" />
          </motion.span>
        </AnimatePresence>
      ) : (
        <motion.span
          variants={likeBtnMotion}
          initial="hidden"
          animate="show"
        >
          <AiOutlinePlus className="fill-black" size={25} fill="white" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default AddToFavouritesButton;
