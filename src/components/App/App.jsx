import React, { Component } from 'react';
import { Tabs } from 'antd';
import MoviesPage from '../movies-page';
import RatedMoviesPage from '../rated-movies-page';
import MovieBaseService from '../../services';
import { GenresProvider } from '../genres-provider';
import ErrorView from '../error-view';

import 'antd/dist/antd.css';
import './app.scss';

const { TabPane } = Tabs;
const movieService = new MovieBaseService();

export default class App extends Component {
  state = {
    guestSessionId: '',
    tab: 1,
    rated: false,
    genres: [],
    genresIsLoaded: false,
    hasError: false,
  };

  async componentDidMount() {
    const { guestSessionId, genres } = this.state;
    if (!guestSessionId) {
      await this.getGuestSession();
    }
    if (!genres.length) {
      await this.getGenres();
    }
  }

  onChangeTab = (key) => {
    this.setState({
      tab: Number(key),
    });
  };

  onRated = () => {
    this.setState({
      rated: true,
    });
  };

  async getGuestSession() {
    try {
      const { guest_session_id: guestSessionId } = await movieService.getGuestSession();
      this.setState(() => {
        return {
          guestSessionId,
        };
      });
    } catch (error) {
      this.setState({
        hasError: error,
      });
    }
  }

  async getGenres() {
    try {
      const { genres } = await movieService.getGenres();
      this.setState({
        genres,
        genresIsLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: error,
      });
    }
  }

  render() {
    const { guestSessionId, tab, rated, genres, genresIsLoaded, hasError } = this.state;

    const errorView = hasError ? <ErrorView error={hasError} /> : null;
    const contentView = !hasError ? (
      <div className="wrapper">
        <GenresProvider value={genres}>
          <Tabs centered defaultActiveKey="1" onChange={this.onChangeTab}>
            <TabPane tab="Search" key="1">
              <MoviesPage guestSessionId={guestSessionId} onRated={this.onRated} genresIsLoaded={genresIsLoaded} />
            </TabPane>
            <TabPane tab="Rated" key="2">
              <RatedMoviesPage
                guestSessionId={guestSessionId}
                tab={tab}
                rated={rated}
                genresIsLoaded={genresIsLoaded}
              />
            </TabPane>
          </Tabs>
        </GenresProvider>
      </div>
    ) : null;

    return (
      <div className="app">
        <div className="app__box">
          {errorView}
          {contentView}
        </div>
      </div>
    );
  }
}
