import React, { useState, useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import PropTypes from 'prop-types';
import Search from '../search';
import MoviesList from '../movies-list';
import movieService from '../../services';
import ErrorView from '../error-view';

import './movies-page.scss';

const MoviesPage = ({ guestSessionId, onRated }) => {
  const [hasError, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentPage, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [keyword, setKeyWord] = useState('batman');

  useEffect(() => {
    const getMovies = async (keyWord, pageValue) => {
      try {
        const {
          results: moviesList,
          total_pages: totalPagesCount,
          page,
          total_results: totalResults,
        } = await movieService.getMoviesByKeyWord(keyWord, pageValue);

        if (totalResults < 1) {
          throw new Error("Sorry, we didn't find anything");
        }

        setMovies(moviesList);
        setTotalPages(totalPagesCount);
        setPage(page);
        setIsLoaded(true);
      } catch (error) {
        setError(error);
      }
    };
    getMovies(keyword, currentPage);
  }, [keyword, currentPage]);

  const onChangeKeyWord = (keyWord) => {
    setKeyWord(keyWord);
  };

  const onChangePage = (page) => {
    setPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const rateMovie = async (value, id) => {
    const data = {
      value,
    };
    try {
      await movieService.rateMovie(id, guestSessionId, data);
    } catch (error) {
      setError(error);
    }
    onRated();
  };

  const onError = hasError ? <ErrorView error={hasError.message} /> : null;
  const onLoad = !isLoaded && !hasError ? <Spin className="spinner" size="large" tip="Loading..." /> : null;
  const content = isLoaded ? (
    <>
      <MoviesList movies={movies} rateMovie={rateMovie} />
      <Pagination
        className="pagination"
        size="large"
        defaultCurrent={currentPage}
        total={totalPages}
        onChange={onChangePage}
      />
    </>
  ) : null;

  return (
    <>
      <Search onChangeKeyWord={onChangeKeyWord} />
      {onError}
      {onLoad}
      {content}
    </>
  );
};

MoviesPage.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  onRated: PropTypes.func.isRequired,
};

export default MoviesPage;
