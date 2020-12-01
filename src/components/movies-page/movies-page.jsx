import React, { Component } from 'react';
import { Pagination, Spin, Alert } from 'antd';
import PropTypes from 'prop-types';
import Search from '../search';
import MoviesList from '../movies-list';
import MovieBaseService from '../../services';

import './movies-page.scss';

export default class MoviesPage extends Component {
  movieService = new MovieBaseService();

  static propTypes = {
    guestSessionId: PropTypes.string.isRequired,
    onRated: PropTypes.func.isRequired,
  };

  state = {
    error: null,
    isLoaded: false,
    movies: [],
    page: null,
    totalPages: null,
    keyWord: 'batman',
  };

  componentDidMount() {
    this.getMovies();
  }

  async getMovies(keyWord, currentPage) {
    try {
      const {
        results: movies,
        total_pages: totalPages,
        page,
        total_results: totalResults,
      } = await this.movieService.getMoviesByKeyWord(keyWord, currentPage);

      if (totalResults < 1) {
        throw new Error("Sorry, we didn't find anything");
      }

      this.setState({
        movies,
        totalPages,
        page,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        error,
        isLoaded: false,
      });
    }
  }

  onChangeKeyWord = (keyword) => {
    this.setState({
      keyWord: keyword,
      error: null,
    });
    this.getMovies(keyword);
  };

  onChangePage = (currentPage) => {
    this.setState({
      page: currentPage,
    });

    const { keyWord } = this.state;

    this.getMovies(keyWord, currentPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  errorView = (error) => {
    if (error.message === "Sorry, we didn't find anything") {
      return <Alert message="No comprendo!?" description={error.message} type="info" showIcon />;
    }
    return <Alert message="Error" description={error.message} type="error" showIcon />;
  };

  rateMovie = async (value, id) => {
    const { guestSessionId, onRated } = this.props;

    const data = {
      value,
    };
    try {
      await this.movieService.rateMovie(id, guestSessionId, data);
    } catch (error) {
      this.setState({
        error,
      });
    }
    onRated();
  };

  render() {
    const { error, isLoaded, movies, page, totalPages } = this.state;

    const onError = error ? this.errorView(error) : null;
    const onLoad = !isLoaded && !error ? <Spin className="spinner" size="large" tip="Loading..." /> : null;
    const content = isLoaded ? (
      <>
        <MoviesList movies={movies} rateMovie={this.rateMovie} />
        <Pagination
          className="pagination"
          size="large"
          current={page}
          total={totalPages}
          onChange={this.onChangePage}
        />
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
