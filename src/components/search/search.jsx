import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './search.scss';

const Search = ({ onChangeKeyWord }) => {
  const [inputValue, setInputValue] = useState('');

  const [debouncedOnChangeKeyWord] = useState(() => debounce(onChangeKeyWord, 2000));

  function updateMoviesList(value) {
    if (value.length < 1) onChangeKeyWord('return');
    if (value.trim()) debouncedOnChangeKeyWord(value);
  }

  function onChange(event) {
    setInputValue(event.target.value);
    updateMoviesList(event.target.value);
  }

  return <input type="text" className="search" placeholder="Search movies..." onChange={onChange} value={inputValue} />;
};

Search.propTypes = {
  onChangeKeyWord: PropTypes.func.isRequired,
};

export default Search;
