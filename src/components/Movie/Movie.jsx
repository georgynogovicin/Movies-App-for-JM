import React from 'react';
import { Card, Rate } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import cropText from '../../helpers/crop-text';

import './Movie.scss';

// export default class Movie extends Component {

//   static propTypes = {
//     poster_path: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     overview: PropTypes.string.isRequired,
//     release_date: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     rating: PropTypes.number.isRequired,
//   }

//   state = {
//     rating: 0,
//   }

//   onChangeVote(value, id) {
//     console.log(value, id)
//   }

//   render() {

//     const { poster_path: posterPath, title, overview, release_date: releaseDate, id, rating } = this.props;

//     return (
//       <Card
//         hoverable
//         className="movie"
//         cover={
//           <img
//             alt="Poster"
//             style={{ width: 183, height: 281 }}
//             className="movie__poster"
//             src={`https://image.tmdb.org/t/p/w200${posterPath}`}
//           />
//         }
//       >
//         <div className="movie__wrapper">
//           <h2 className="movie__title">{cropText(title, 20)}</h2>
//           <p className="movie__release-date">{releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null}</p>
//           <div className="genres">
//             <div className="genres__item">Action</div>
//             <div className="genres__item">Drama</div>
//           </div>
//           <div className="movie__overview">
//             <p>{cropText(overview, 180)}</p>
//           </div>
//           <Rate count="8" allowHalf defaultValue={rating} onChange={(value) => this.onChangeVote(value, id)} />
//         </div>
//       </Card>
//     )
//   }
// }

function Movie({ poster_path: posterPath, title, overview, release_date: releaseDate, rating, rateMovie, id }) {
  return (
    <Card
      hoverable
      className="movie"
      cover={
        <img
          alt="Poster"
          style={{ width: 183, height: 281 }}
          className="movie__poster"
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w200${posterPath}`
              : `https://image.tmdb.org/t/p/w200/8QGF0PtMlTK1cU30WjNItVbO1Jd.jpg`
          }
        />
      }
    >
      <div className="movie__wrapper">
        <h2 className="movie__title">{cropText(title, 20)}</h2>
        <p className="movie__release-date">{releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null}</p>
        <div className="genres">
          <div className="genres__item">Action</div>
          <div className="genres__item">Drama</div>
        </div>
        <div className="movie__overview">
          <p>{cropText(overview, 180)}</p>
        </div>
        <Rate count="8" allowHalf defaultValue={rating} onChange={(value) => rateMovie(value, id)} />
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
  rating: PropTypes.number.isRequired,
  rateMovie: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Movie;
