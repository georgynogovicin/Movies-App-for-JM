import React, { Component } from 'react';
import MovieBaseService from '../../services';
import MoviesList from '../movies-list';

import 'antd/dist/antd.css';
import './app.scss';

const movieService = new MovieBaseService();

export default class App extends Component {
  state = {
    error: null,
    isLoaded: true,
    movies: [],
  };

  componentDidMount() {
    const movies = movieService.getMoviesByKeyWord();

    movies.then((result) => {
      this.setState({
        isLoaded: true,
        movies: result,
      });
    });
  }

  render() {
    const { error, isLoaded, movies } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>...Загрузка</div>;
    }
    return (
      <div className="wrapper">
        <MoviesList movies={movies} />
      </div>
    );
  }
}
