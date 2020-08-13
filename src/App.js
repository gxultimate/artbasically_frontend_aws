import React, {Component} from 'react';
import {HashRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import './css/style.css';
import './css/normalize.css';
import './css/printart.css';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './ScrollToTop'
class App extends Component {
  render() {
    return (
      <Router basename={'/'}>
        <main>
          <ScrollToTop/>
          <Routes />
        </main>
      </Router>
    );
  }
}

export default App;
