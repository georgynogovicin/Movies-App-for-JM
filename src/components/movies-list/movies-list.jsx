import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import Movie from '../Movie';

import './movies.list.scss';

const { TabPane } = Tabs;

const MoviesList = ({ movies }) => {
  const items = movies.map((movie) => {
    const { id, ...props } = movie;
    return <Movie key={id} {...props} />;
  });

  return (
    <Tabs centered>
      <TabPane tab="Search" className="content">
        {items}
      </TabPane>
    </Tabs>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.instanceOf(Array).isRequired,
};

export default MoviesList;
