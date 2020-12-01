import React, { Component } from 'react';
import { Pagination, Spin, Alert } from 'antd';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list';
import MovieBaseService from '../../services';

import './rated-movies-page.scss';

export default class RatedMoviesPage extends Component {
  movieService = new MovieBaseService();

  static propTypes = {
    guestSessionId: PropTypes.string.isRequired,
    tab: PropTypes.number.isRequired,
    rated: PropTypes.bool.isRequired,
  };

  state = {
    error: null,
    isLoaded: false,
    movies: [],
    page: null,
    totalPages: null,
    keyWord: 'return',
  };

  componentDidMount() {
    this.getRatedMovies();
  }

  componentDidUpdate(prevProps) {
    const { tab } = this.props;

    if (prevProps.tab !== tab) {
      this.getRatedMovies();
    }
  }

  async getRatedMovies() {
    const { guestSessionId, rated } = this.props;

    try {
      if (!rated) {
        throw new Error("You didn't rate any movie yet");
      }
      const {
        results: movies,
        total_pages: totalPages,
        page,
        total_results: totalResults,
      } = await this.movieService.getRatedMovies(guestSessionId);

      if (totalResults < 1) {
        throw new Error("Sorry, we didn't find anything");
      }

      this.setState({
        movies,
        totalPages,
        page,
        isLoaded: true,
        error: null,
      });
    } catch (error) {
      this.setState({
        error,
        isLoaded: false,
      });
    }
  }

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
    if (error.message === "You didn't rate any movie yet") {
      return <Alert message="Try to rate some movie first" description={error.message} type="info" showIcon />;
    }

    return <Alert message="Error" description={error.message} type="error" showIcon />;
  };

  rateMovie = (value, id) => {
    const { guestSessionId } = this.props;

    const data = {
      value,
    };
    this.movieService.rateMovie(id, guestSessionId, data);
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
        {onError}
        {onLoad}
        {content}
      </>
    );
  }
}
