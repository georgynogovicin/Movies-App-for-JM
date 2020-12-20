import React, { useContext } from 'react';
import { Card, Rate } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import ClassNames from 'classnames';
import cropText from '../../helpers/crop-text';
import GenresProfiler from '../genres-provider';

// eslint-disable-next-line import/no-unresolved
import './Movie.scss';
import noPoster from '../../img/box-mockup_1017-8601.jpg';

const { Meta } = Card;

const Movie = ({
  poster_path: posterPath,
  title,
  overview,
  release_date: releaseDate,
  rating,
  rateMovie,
  id,
  vote_average: voteAverage,
  genre_ids: genresIDs,
}) => {
  const movieVote = ClassNames({
    'movie__vote-average movie__vote-average--low': voteAverage <= 3,
    'movie__vote-average movie__vote-average--low-middle': voteAverage > 3 && voteAverage <= 5,
    'movie__vote-average movie__vote-average--high-middle': voteAverage > 5 && voteAverage <= 7,
    'movie__vote-average movie__vote-average--high': voteAverage > 7,
  });

  const genresList = useContext(GenresProfiler);

  const genres = genresList.filter((item) => genresIDs.includes(item.id));

  const [first, second, third] = genres.map((item) => {
    return (
      <div key={item.id} className="genres__item">
        {item.name}
      </div>
    );
  });
  const genresView = (
    <div className="genres">
      {first}
      {second}
      {third}
    </div>
  );

  return (
    <Card
      className="movie"
      style={{ width: 454, display: 'flex' }}
      cover={
        <img
          alt={title}
          className="movie__poster"
          src={posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : noPoster}
        />
      }
    >
      <Meta
        title={cropText(title, 20)}
        description={releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null}
      />
      <div className={movieVote}>{voteAverage}</div>
      {genresView}
      <div className="movie__overview">{cropText(overview, 150)}</div>
      <Rate
        count="10"
        className="movie__rate"
        style={{ fontSize: 15, alignSelf: 'flex-end' }}
        allowHalf
        defaultValue={rating}
        onChange={(value) => rateMovie(value, id)}
      />
    </Card>
  );
};

Movie.defaultProps = {
  poster_path: noPoster,
  title: 'Movie',
  overview: 'About film',
  rating: 0,
};

Movie.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string.isRequired,
  rating: PropTypes.number,
  rateMovie: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  vote_average: PropTypes.number.isRequired,
  genre_ids: PropTypes.instanceOf(Array).isRequired,
};

export default Movie;
