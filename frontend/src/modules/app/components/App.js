import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Body from './Body';
import Footer from './Footer';

const App = () => {

  return (
      <div>
          <Router>
              <Body></Body>
          </Router>
          <Footer></Footer>
      </div>
  );

}
  
export default App;
