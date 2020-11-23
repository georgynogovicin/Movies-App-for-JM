import React from 'react';
import { Tabs } from 'antd';
import MoviesPage from '../movies-page';

import 'antd/dist/antd.css';
import './app.scss';

const { TabPane } = Tabs;

const App = () => {
  return (
    <div className="wrapper">
      <Tabs centered>
        <TabPane tab="Search" key="1">
          <MoviesPage />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;

// export default class App extends Component {
//   movieService = new MovieBaseService();

//   state = {
//     error: null,
//     isLoaded: false,
//     movies: [],
//   };

//   componentDidMount() {
//     this.getMovies();
//   }

//   async getMovies() {
//     try {
//       const movies = await this.movieService.getMoviesByKeyWord();

//       this.setState({
//         movies,
//         isLoaded: true,
//       });
//     } catch (error) {
//       this.setState({
//         error,
//       });
//     }
//   }

//   render() {
//     const { error, isLoaded, movies } = this.state;

//     const onError = error ? <Alert message="Error" description={error.message} type="error" showIcon /> : null;
//     const onLoad = !isLoaded ? <Spin className="spinner" size="large" tip="Loading..." /> : null;
//     const content = isLoaded ? <MoviesList movies={movies} /> : null;

//     return (
//       <div className="wrapper">
//         { onError}
//         { onLoad}
//         { content}
//       </div>
//     );
//   }
// }
