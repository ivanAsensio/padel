import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const App = () => {

  return (
      <div>
          <Router>
              <Header></Header>
              <Body></Body>
          </Router>
          <Footer></Footer>
      </div>
  );

}
  
export default App;
