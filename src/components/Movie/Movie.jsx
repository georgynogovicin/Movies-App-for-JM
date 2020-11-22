import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import cropText from '../../helpers/crop-text';

import './Movie.scss';

// const IMG_API = 'https://image.tmdb.org/t/p/w200';

function Movie({ poster_path: posterPath, title, overview, release_date: releaseDate }) {
  return (
    <Card
      hoverable
      className="movie"
      cover={<img alt="example" className="movie__poster" src={`https://image.tmdb.org/t/p/w200${posterPath}`} />}
    >
      <div className="movie__wrapper">
        <h2 className="movie__title">{cropText(title, 20)}</h2>
        <p className="movie__release-date">{format(new Date(releaseDate), 'MMMM dd, yyyy')}</p>
        <div className="genres">
          <div className="genres__item">Action</div>
          <div className="genres__item">Drama</div>
        </div>
        <div className="movie__overview">
          <p>{cropText(overview, 210)}</p>
        </div>
      </div>
    </Card>
  );
}

Movie.defaultProps = {
  poster_path: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  title: 'Movie',
  overview: 'About film',
};

Movie.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string.isRequired,
};

export default Movie;
