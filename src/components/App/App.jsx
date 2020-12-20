import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import MoviesPage from '../movies-page';
import RatedMoviesPage from '../rated-movies-page';
import movieService from '../../services';
import GenresProfiler from '../genres-provider';
import ErrorView from '../error-view';

import 'antd/dist/antd.css';
// eslint-disable-next-line import/no-unresolved
import './App.scss';

const { TabPane } = Tabs;
const { Provider } = GenresProfiler;

const App = () => {
  const [guestSessionId, setGuestSessionId] = useState('');
  const [tab, setTab] = useState(1);
  const [rated, setRated] = useState(false);
  const [genresList, setGenres] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { guest_session_id: guestSession } = await movieService.getGuestSession();
        const { genres } = await movieService.getGenres();
        setGuestSessionId(guestSession);
        setGenres(genres);
      } catch (error) {
        setHasError(error);
      }
    };
    fetchData();
  }, []);

  const onChangeTab = (key) => {
    setTab(Number(key));
  };

  const onRated = () => {
    setRated(true);
  };

  const errorView = hasError ? <ErrorView error={hasError} /> : null;
  const contentView = !hasError ? (
    <div className="wrapper">
      <Provider value={genresList}>
        <Tabs centered defaultActiveKey="1" onChange={onChangeTab}>
          <TabPane tab="Search" key="1">
            <MoviesPage guestSessionId={guestSessionId} onRated={onRated} />
          </TabPane>
          <TabPane tab="Rated" key="2">
            <RatedMoviesPage guestSessionId={guestSessionId} tab={tab} rated={rated} />
          </TabPane>
        </Tabs>
      </Provider>
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
};

export default App;
