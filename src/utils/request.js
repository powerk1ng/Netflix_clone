const apiKey = import.meta.env.VITE_DATAKEY 
const page = Math.floor(Math.random() * 5 + 1);

const request = {
  requestSearch: (query) => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
  requestData: (title) => `https://api.themoviedb.org/3/movie/${title}?api_key=${apiKey}&language=en-US&page=${page}`,
  requestTrending: (title, time) => `https://api.themoviedb.org/3/trending/${title}/${time}?api_key=${apiKey}`,
  requestSingleMovie: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`,
  requestGenre: (genre, pages) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genre}&page=${pages}`,
}

export default request