import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import './css/style.css';
import './css/normalize.css';
import './css/printart.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  render() {
    return (
      


      <Router basename={'/'}>
        <main>
          <Routes />
        </main>

        
      </Router>
   
      
    );
  }
}

export default App;
