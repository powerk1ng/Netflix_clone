import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { DotLoader } from "react-spinners";
import { motion } from "framer-motion";
import { container } from '../utils/motionVariants.js';

import MainContext from "../useContext/MainContext";
import FavouriteMovieItem from "../components/FavouriteMovieItem";

const FavouriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("z-a"); // asc or desc
  const { user } = useContext(MainContext);

  useEffect(() => {
    if (!movies.length) {
      setLoading(true);
    }
    const unsubscribe = onSnapshot(
      doc(db, "users", `${user?.email}`),
      (doc) => {
        setMovies(doc.data()?.savedShows);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  const handleSort = () => {
    if (sortOrder === "a-z") {
      setMovies([...movies].sort((a, b) => a.title.localeCompare(b.title)));
      setSortOrder("z-a");
    } else {
      setMovies([...movies].sort((a, b) => b.title.localeCompare(a.title)));
      setSortOrder("a-z");
    }
  };

  return (
    <div className="w-full min-h-screen bg-black pt-20 px-5">
      <div className="flex justify-between items-center mb-5 max-sm:flex-col max-sm:gap-y-2">
        <motion.h2 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-white text-[40px]">My movies list</motion.h2>
        {movies && movies.length && (
          <button
            className="border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
            onClick={handleSort}
          >
            Sort by {sortOrder === "a-z" ? "Name [A-Z]" : "Name [Z-A]"}
          </button>
        )}
      </div>

      {/* loader */}
      {loading && (
        <div className="w-full h-screen flex items-center justify-center bg-black absolute left-0 top-0 ">
          <DotLoader color="red" />
        </div>
      )}

      {movies && movies.length ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-white grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-10 py-5">
          {movies.map((item) => (
              <FavouriteMovieItem key={item.id} {...item} movies={movies} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">
            No movies available yet
          </h2> 
          <p className="text-gray-400">
            Start saving your favourite shows and movies to see them here.
          </p>
        </div>
      )}
    </div>
  );
};

export default FavouriteMovies;
