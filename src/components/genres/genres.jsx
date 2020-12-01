import React from 'react';
import PropTypes from 'prop-types';
import { GenresConsumer } from '../genres-provider';

import './genres.scss';

function Genres({ genresIDs }) {
  return (
    <div className="genres">
      <GenresConsumer>
        {(genres) => {
          const [first, second] = genresIDs.map((genreId) => {
            const [one] = genres.filter((item) => item.id === genreId);
            const { id, name } = one;

            return (
              <div key={id} className="genres__item">
                {name}
              </div>
            );
          });

          return (
            <>
              {first}
              {second}
            </>
          );
        }}
      </GenresConsumer>
    </div>
  );
}

Genres.propTypes = {
  genresIDs: PropTypes.instanceOf(Array).isRequired,
};

export default Genres;
