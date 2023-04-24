import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { DotLoader } from "react-spinners";
import React, { useState, useEffect, useRef, useContext } from "react";
import MovieItem from "../components/MovieItem";
import MainContext from "../useContext/MainContext";
import Error from "./Error";

const RowCarousel = ({ title, apiRequestType }) => {
  const [data, setData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(null);
  const [initialScrollPosition, setInitialScrollPosition] = useState(null);
  const { genreId } = useContext(MainContext);
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiRequestType
      .then((data) => {
        setData(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
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
    <>
      {error && <Error />}
      {loading ? (
        <div className="w-full h-[220px] flex items-center justify-center bg-black absolute left-0 top-0 ">
          <DotLoader color="red" />
        </div>
      ) : (
        <div className="pl-2">
          {!error && <h2 className="text-white font-bold py-4">{title}</h2>}
          <div className="relative flex items-center">
            {!error && (
              // button left-slide
              <button
                onClick={() => slideOnArrowClick(-1)}
                className="row-slider left-1.5"
              >
                <GoChevronLeft fill="white" size={25} />
              </button>
            )}

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
                data.map((movie, index) => (
                  <MovieItem key={index} {...movie} />
                ))}
            </div>
            {!error && (
              // button slide right
              <button
                onClick={() => slideOnArrowClick(1)}
                className="row-slider right-1.5"
              >
                <GoChevronRight fill="white" size={25} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RowCarousel;
