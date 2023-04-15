const apiKey = import.meta.env.VITE_DATAKEY 

const request = {
  requestSearch: (query) => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
  requestData: (title, page) => `https://api.themoviedb.org/3/movie/${title}?api_key=${apiKey}&language=en-US&page=${page}`,
  requestTrending: (title, time) => `https://api.themoviedb.org/3/trending/${title}/${time}?api_key=${apiKey}`,
  requestSingleMovie: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
}

export default request