export default class MovieBaseService {
  API_URL = 'https://api.themoviedb.org/3/';

  IMG_URL = 'https://image.tmdb.org/t/p/w200';

  async getResource(url) {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/${url}`);

      if (!res.ok) {
        throw new Error(`Could not Fetch ${url}. Recieved ${res.satus}`);
      }
      const body = await res.json();
      return body;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMoviesByKeyWord(keyword = 'return', pageNumber = 1) {
    const res = await this.getResource(
      `search/movie?api_key=fb3986d1ebcf30c4a969c0784a406177&query=${keyword}&page=${pageNumber}`
    );
    return res.results;
  }
}
