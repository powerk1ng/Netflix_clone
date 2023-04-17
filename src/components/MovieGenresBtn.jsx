import React, { useState } from "react";

const MovieGenresBtn = ({ genre, setGenre, options, setGenreId }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const setTitle = (genre, id) => {
    setGenre(genre);
    setGenreId(id)
    setIsSelectOpen(false);
  };
  const openSelectMenu = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <div className="absolute right-4 sm:top-18 top-20">
      <button
        className="text-white bg-transparent focus:ring-2 focus:outline-none focus:ring-white font-medium text-sm px-4 sm:py-2.5 py-2 text-right inline-flex items-center justify-between w-[150px] border"
        type="button"
        onClick={openSelectMenu}
      >
        {genre}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        className={`absolute top-12 z-[50] bg-black text-white shadow w-full ${
          isSelectOpen ? "block" : "hidden"
        }`}
        onClick={openSelectMenu}
      >
        <ul className="py-2 text-sm">
          {options.map((item, index) => (
            <li
              onClick={() => setTitle(item.name, item.id)}
              className="genre-btn"
              key={index}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieGenresBtn;
