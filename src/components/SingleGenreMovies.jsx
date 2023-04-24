import RowCarousel from './RowCarousel';
import NetflixServices from '../utils/NetflixServices';

const SingleGenreMovies = ({genre, genreId, page}) => {
  const NetflixService = new NetflixServices();

  return (
    <div>
        <h2 className='text-white px-4  sm:text-4xl text-xl font-bold pt-5'>{genre} Movies</h2>
      <RowCarousel apiRequestType={NetflixService.requestGenre(genreId, page)} />
      <RowCarousel apiRequestType={NetflixService.requestGenre(genreId, page + 1)} />
      <RowCarousel apiRequestType={NetflixService.requestGenre(genreId, page + 2)} />
      <RowCarousel apiRequestType={NetflixService.requestGenre(genreId, page + 3)}
      />
    </div>
  );
};

export default SingleGenreMovies;
