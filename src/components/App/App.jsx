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
    tab: 1,
    rated: false,
  };

  componentDidMount() {
    const { guestSessionId } = this.state;
    if (!guestSessionId) {
      this.getGuestSession();
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
      // eslint-disable-next-line
      console.log(error);
    }
  }

  render() {
    const { guestSessionId, tab, rated } = this.state;

    return (
      <div className="wrapper">
        <Tabs centered defaultActiveKey="1" onChange={this.onChangeTab}>
          <TabPane tab="Search" key="1">
            <MoviesPage guestSessionId={guestSessionId} onRated={this.onRated} />
          </TabPane>
          <TabPane tab="Rated" key="2">
            <RatedMoviesPage guestSessionId={guestSessionId} tab={tab} rated={rated} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
