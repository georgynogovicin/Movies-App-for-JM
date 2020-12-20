import React, { useState, useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list';
import movieService from '../../services';
import ErrorView from '../error-view';

import './rated-movies-page.scss';

const RatedMoviesPage = ({ guestSessionId, rated, tab }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const getRatedMovies = async (sessionId, pageCount) => {
      try {
        if (!rated) {
          throw new Error("You didn't rate any movie yet");
        }
        const {
          results: newMovies,
          total_pages: newTotalPages,
          page,
          total_results: totalResults,
        } = await movieService.getRatedMovies(sessionId, pageCount);
        if (totalResults < 1) {
          throw new Error("Sorry, we didn't find anything");
        }

        setMovies(newMovies);
        setTotalPages(newTotalPages);
        setCurrentPage(page);
        setLoaded(true);
        setError(null);
      } catch (onError) {
        setError(onError);
      }
    };

    getRatedMovies(guestSessionId, currentPage);
  }, [guestSessionId, currentPage, rated, tab]);

  function onChangePage(page) {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function rateMovie(value, id) {
    const data = {
      value,
    };
    try {
      await movieService.rateMovie(id, guestSessionId, data);
    } catch (newError) {
      setError(newError);
    }
  }

  const onError = error ? <ErrorView error={error.message} /> : null;
  const onLoad = !isLoaded && !error ? <Spin className="spinner" size="large" tip="Loading..." /> : null;
  const content = isLoaded ? (
    <>
      <MoviesList movies={movies} rateMovie={rateMovie} />
      <Pagination
        className="pagination"
        size="large"
        current={currentPage}
        total={totalPages}
        defaultCurrent={1}
        onChange={onChangePage}
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
};

RatedMoviesPage.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  tab: PropTypes.number.isRequired,
  rated: PropTypes.bool.isRequired,
};

export default RatedMoviesPage;
