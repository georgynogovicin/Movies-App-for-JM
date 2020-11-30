import React, { Component } from 'react';
import { Tabs } from 'antd';
import MoviesPage from '../movies-page';
import RatedMoviesPage from '../rated-movies-page';
import MovieBaseService from '../../services';

import 'antd/dist/antd.css';
import './app.scss';

const { TabPane } = Tabs;
const movieService = new MovieBaseService();

export default class App extends Component {
  state = {
    guestSessionId: '',
    isRated: false,
    tab: 1,
  };

  componentDidMount() {
    const { guestSessionId } = this.state;
    if (!guestSessionId) {
      this.getGuestSession();
    }
  }

  onRated = () => {
    this.setState({
      isRated: true,
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
      // eslint-disable-next-line
      console.log(error);
    }
  }

  onChangeTab = (key) => {
    this.setState({
      tab: key,
    });
  };

  render() {
    const { guestSessionId, isRated, tab } = this.state;

    return (
      <div className="wrapper">
        <Tabs centered onChange={this.onChangeTab}>
          <TabPane tab="Search" key="1">
            <MoviesPage guestSessionId={guestSessionId} onRated={this.onRated} />
          </TabPane>
          <TabPane tab="Rated" key="2">
            <RatedMoviesPage guestSessionId={guestSessionId} isRated={isRated} tab={tab} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
