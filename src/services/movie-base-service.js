export default class MovieBaseService {
  API_URL = 'https://api.themoviedb.org/3/';

  IMG_URL = 'https://image.tmdb.org/t/p/w200';

  async getResource(...params) {
    const [url, data] = params;

    try {
      const res = data
        ? await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data),
          })
        : await fetch(url);

      if (!res.ok) {
        throw new Error(`Could not Fetch ${url}. Recieved ${res.satus}`);
      }
      const body = await res.json();
      return body;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMoviesByKeyWord(keyword = 'batman', pageNumber = 1) {
    const res = await this.getResource(
      `${this.API_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${keyword}&page=${pageNumber}`
    );
    return res;
  }

  async getGuestSession() {
    const res = await this.getResource(
      `${this.API_URL}authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`
    );

    if (!res.success) {
      throw new Error('Create guest session error');
    }

    return res;
  }

  async getRatedMovies(sessionId) {
    const res = await this.getResource(
      `${this.API_URL}guest_session/${sessionId}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}`
    );

    return res;
  }

  async rateMovie(movieId, guestSessionId, body) {
    const res = await this.getResource(
      `${this.API_URL}movie/${movieId}/rating?api_key=${process.env.REACT_APP_API_KEY}&guest_session_id=${guestSessionId}`,
      body
    );

    return res.status_message;
  }
}
