const apiKey = import.meta.env.VITE_DATAKEY;
export const requestSingleMovie = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`;
