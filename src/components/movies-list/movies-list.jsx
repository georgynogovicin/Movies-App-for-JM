import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../Movie';

import './movies.list.scss';

const MoviesList = ({ movies, rateMovie }) => {
  const items = movies.map((movie) => {
    const { id, ...props } = movie;
    return <Movie key={id} id={id} {...props} rateMovie={rateMovie} />;
  });

  return <div className="movies-list">{items}</div>;
};

MoviesList.propTypes = {
  movies: PropTypes.instanceOf(Array).isRequired,
  rateMovie: PropTypes.func.isRequired,
};

export default MoviesList;
