import request from '../utils/request'
import RowCarousel from '../components/RowCarousel';
import MovieGenresBtn from '../components/MovieGenresBtn';
import { useContext, useState } from 'react';
import SingleGenreMovies from '../components/SingleGenreMovies';
import MainContext from '../useContext/MainContext';
import NetflixServices from '../utils/NetflixServices';

const Movies = () => {
  const NetflixService = new NetflixServices();

    const options = [
        { name: "All", id: 1 },
        { name: "Fantasy", id: 14 },
        { name: "Animation", id: 16 },
        { name: "Action", id: 28 },
        { name: "Comedy", id: 35 },
        { name: "Horror", id: 27 },
        { name: "Documentary", id: 99 },
      ];
    const [genre, setGenre] = useState('All')
    const page = Math.floor(Math.random() * 14 + 1);
    const {genreId, setGenreId} = useContext(MainContext);

  return (
    <div className='w-full min-h-screen bg-black sm:py-20 py-16 relative'>
        <MovieGenresBtn genre={genre} setGenre={setGenre} options={options} setGenreId={setGenreId}/>
        {genreId === 1 ? (
            <>
                <RowCarousel title="Action Movies" apiRequestType={NetflixService.requestGenre(28, page)}/>
                <RowCarousel title="Comedy Movies" apiRequestType={NetflixService.requestGenre(35, page)}/>
                <RowCarousel title="Horror Movies" apiRequestType={NetflixService.requestGenre(27, page)}/>
                <RowCarousel title="Documentary Movies" apiRequestType={NetflixService.requestGenre(99, page)}/>
            </>
        )
        : (
            <SingleGenreMovies genre={genre} genreId={genreId} page={page}/>
        )} 
    </div>
  )
}

export default Movies