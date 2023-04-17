import request from '../utils/request'
import RowCarousel from './RowCarousel';

const SingleGenreMovies = ({genre, genreId, page}) => {
  
  return (
    <div>
        <h2 className='text-white px-4  sm:text-4xl text-xl font-bold pt-5'>{genre} Movies</h2>
      <RowCarousel fetchUrl={request.requestGenre(genreId, page)} />
      <RowCarousel fetchUrl={request.requestGenre(genreId, page + 1)} />
      <RowCarousel fetchUrl={request.requestGenre(genreId, page + 2)} />
      <RowCarousel fetchUrl={request.requestGenre(genreId, page + 3)}
      />
    </div>
  );
};

export default SingleGenreMovies;
