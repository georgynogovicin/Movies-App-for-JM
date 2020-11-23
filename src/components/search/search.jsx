import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './search.scss';

export default class Search extends Component {
  static propTypes = {
    onChangeKeyWord: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  componentDidMount() {
    this.updateMoviesLIst = debounce(this.updateMoviesList, 2000);
  }

  onChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
    this.updateMoviesLIst(event.target.value);
  };

  updateMoviesList = (value) => {
    const { onChangeKeyWord } = this.props;

    if (value.trim()) onChangeKeyWord(value);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <input
        type="text"
        className="search"
        placeholder="Search movies..."
        onChange={this.onChange}
        value={inputValue}
      />
    );
  }
}
