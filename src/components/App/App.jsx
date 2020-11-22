import React, { Component } from 'react';
import { Spin, Alert } from 'antd';
import MovieBaseService from '../../services';
import MoviesList from '../movies-list';

import 'antd/dist/antd.css';
import './app.scss';

export default class App extends Component {
  movieService = new MovieBaseService();

  state = {
    error: null,
    isLoaded: false,
    movies: [],
  };

  constructor() {
    super();
    this.getMovies();
  }

  async getMovies() {
    try {
      const movies = await this.movieService.getMoviesByKeyWord('return');

      this.setState({
        movies,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        error,
      });
    }
  }

  render() {
    const { error, isLoaded, movies } = this.state;

    if (error) {
      return <Alert message="Error" description={error.message} type="error" showIcon />;
    }
    if (!isLoaded) {
      return <Spin className="spinner" size="large" tip="Loading..." />;
    }
    return (
      <div className="wrapper">
        <MoviesList movies={movies} />
      </div>
    );
  }
}
