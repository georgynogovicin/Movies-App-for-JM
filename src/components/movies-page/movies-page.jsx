import React, { Component } from 'react';
import { Pagination, Spin, Alert } from 'antd';
import Search from '../search';
import MoviesList from '../movies-list';
import MovieBaseService from '../../services';

import './movies-page.scss';

export default class MoviesPage extends Component {
  movieService = new MovieBaseService();

  state = {
    error: null,
    isLoaded: false,
    movies: [],
  };

  componentDidMount() {
    this.getMovies();
  }

  async getMovies(keyWord = 'return') {
    try {
      const movies = await this.movieService.getMoviesByKeyWord(keyWord);

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

  onChangeKeyWord = (keyword) => {
    this.getMovies(keyword);
  };

  render() {
    const { error, isLoaded, movies } = this.state;

    const onError = error ? <Alert message="Error" description={error.message} type="error" showIcon /> : null;
    const onLoad = !isLoaded ? <Spin className="spinner" size="large" tip="Loading..." /> : null;
    const content = isLoaded ? (
      <>
        {' '}
        <MoviesList movies={movies} /> <Pagination className="pagination" size="large" />{' '}
      </>
    ) : null;

    return (
      <>
        <Search onChangeKeyWord={this.onChangeKeyWord} />
        {onError}
        {onLoad}
        {content}
      </>
    );
  }
}
