import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import * as actions from '../../users/actions';

const App = () => {

    const cookies = new Cookies();
    const cookiesObtained = cookies.get('user');
    const dispatch = useDispatch();

    cookiesObtained && cookiesObtained.user && dispatch(actions.loginCompleted(cookiesObtained));
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
