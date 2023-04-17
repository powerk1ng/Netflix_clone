import React, { useState, useEffect, useRef, useContext } from "react";
import MovieItem from "../components/MovieItem";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import MainContext from "../useContext/MainContext";

const RowCarousel = ({ title, fetchUrl }) => {
  const [data, setData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(null);
  const [initialScrollPosition, setInitialScrollPosition] = useState(null);
  const {genreId} = useContext(MainContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      });
  }, [genreId]);

  function handleMouseDown(event) {
    event.preventDefault();
    setIsDragging(true);
    setInitialMousePosition(event.clientX);
    setInitialScrollPosition(scrollRef.current.scrollLeft);
  }

  function handleMouseMove(event) {
    if (isDragging) {
      if (event.buttons === 1) {
        const delta = event.clientX - initialMousePosition;
        scrollRef.current.scrollLeft = initialScrollPosition - delta * 1;
      } else {
        setIsDragging(false);
      }
    }
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  const slideOnArrowClick = (sign) => {
    let scrollPos = scrollRef.current.scrollLeft;
    scrollPos = sign === 1 ? scrollPos + 500 : scrollPos - 500;
    scrollRef.current.scrollLeft = scrollPos;
  };

  return (
    <div className="pl-2">
      <h2 className="text-white font-bold py-4">{title}</h2>
      <div className="relative flex items-center">
        {/* slider-left-button */}
        <button
          onClick={() => slideOnArrowClick(-1)}
          className="row-slider left-1.5"
        >
          <GoChevronLeft fill="white" size={25} />
        </button>

        {/* main body of carousel */}
        <div
          ref={scrollRef}
          id={"slider"}
          className="h-full relative scroll-smooth scrollbar-hide overflow-y-hidden whitespace-nowrap outline-none"
          style={{ overflowX: "scroll" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          tabIndex="0"
        >
          {/* movie items  */}
          {data.length > 0 &&
            data.map((movie, index) => <MovieItem key={index} {...movie} />)}
        </div>

        {/* slider-right-button */}
        <button
          onClick={() => slideOnArrowClick(1)}
          className="row-slider right-1.5"
        >
          <GoChevronRight fill="white" size={25} />
        </button>
      </div>
    </div>
  );
};

export default RowCarousel;
