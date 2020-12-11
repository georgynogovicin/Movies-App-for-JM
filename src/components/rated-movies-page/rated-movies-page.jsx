import React, { Component } from 'react';
import { Pagination, Spin } from 'antd';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list';
import movieService from '../../services';
import ErrorView from '../error-view';

import './rated-movies-page.scss';

export default class RatedMoviesPage extends Component {
  static propTypes = {
    guestSessionId: PropTypes.string.isRequired,
    tab: PropTypes.number.isRequired,
    rated: PropTypes.bool.isRequired,
    genresIsLoaded: PropTypes.bool.isRequired,
  };

  state = {
    error: null,
    isLoaded: false,
    movies: [],
    page: null,
    totalPages: null,
    // keyWord: 'return',
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
    const { currentPage } = this.state;

    try {
      if (!rated) {
        throw new Error("You didn't rate any movie yet");
      }
      const {
        results: movies,
        total_pages: totalPages,
        page,
        total_results: totalResults,
      } = await movieService.getRatedMovies(guestSessionId, currentPage);

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

    this.getRatedMovies();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  rateMovie = async (value, id) => {
    const { guestSessionId } = this.props;

    const data = {
      value,
    };
    try {
      await movieService.rateMovie(id, guestSessionId, data);
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  render() {
    const { error, isLoaded, movies, page, totalPages } = this.state;
    const { genresIsLoaded } = this.props;

    const onError = error ? <ErrorView error={error.message} /> : null;
    const onLoad = !isLoaded && !error ? <Spin className="spinner" size="large" tip="Loading..." /> : null;
    const content =
      isLoaded && genresIsLoaded ? (
        <>
          <MoviesList movies={movies} rateMovie={this.rateMovie} />
          <Pagination
            className="pagination"
            size="large"
            current={page}
            total={totalPages}
            defaultCurrent={1}
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
