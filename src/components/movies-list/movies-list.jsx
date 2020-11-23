import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../Movie';

import './movies.list.scss';

const MoviesList = ({ movies }) => {
  const items = movies.map((movie) => {
    const { id, ...props } = movie;
    return <Movie key={id} {...props} />;
  });

  return <section className="movies-list">{items}</section>;
};

MoviesList.propTypes = {
  movies: PropTypes.instanceOf(Array).isRequired,
};

export default MoviesList;
