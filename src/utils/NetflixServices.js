class NetflixServices {
    
    _apiKey = import.meta.env.VITE_DATAKEY;
    _baseUrl = 'https://api.themoviedb.org/3';
    page = Math.floor(Math.random() * 5 + 1);

    apiRequest = async (url) => {
        try {
            const request = await fetch(url);

            if (!request.ok) {
                throw new Error(`couldn't fetch ${url} status: ${request.status}`);
            }

            return await request.json();
        } catch (error) {
            console.error(`Error fetching ${url}: ${error.message}`);
        }
    };

    requestDataType = (title) => {
        return this.apiRequest(`${this._baseUrl}/movie/${title}?api_key=${this._apiKey}&language=en-US&page=${this.page}`)
    }

    requestSearch = (query) => {
        return this.apiRequest(`${this._baseUrl}/search/movie?api_key=${this._apiKey}&query=${query}`);
    }

    requestTrending = (title, time) => {
        return this.apiRequest(`${this._baseUrl}/trending/${title}/${time}?api_key=${this._apiKey}`);
    }

    requestSingleMovie = (id) => {
        return this.apiRequest(`${this._baseUrl}/movie/${id}?api_key=${this._apiKey}&append_to_response=videos`);
    }

    requestGenre = (genre, pages) => {
        return this.apiRequest(`${this._baseUrl}/discover/movie?api_key=${this._apiKey}&language=en-US&with_genres=${genre}&page=${pages}`)
    }
}

export default NetflixServices;