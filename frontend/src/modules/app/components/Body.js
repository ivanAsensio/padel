import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {Login, SignUp, Logout, UpdateProfile, ChangePassword, DetailsProfile, UserList, UserListResult} from '../../users';
import users from '../../users';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const userRole = useSelector(users.selectors.getUserRole) === "USER";
    const user = useSelector(users.selectors.getUser);

    
   return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Switch>
                <Route exact path="/"><Home/></Route>
                {loggedIn && <Route exact path="/users/update-profile"><UpdateProfile/></Route>}
                {!loggedIn && <Route exact path="/users/login"><Login/></Route>}
                {!userRole && loggedIn && <Route exact path="/users/signup"><SignUp/></Route>}
                {!userRole && loggedIn && <Route exact path="/users/userList"><UserList/></Route>}
                {!userRole && loggedIn && <Route exact path="/users/usersList-result"><UserListResult/></Route>}
                {loggedIn && <Route exact path="/users/change-password"><ChangePassword/></Route>}
                {loggedIn && <Route exact path="/users/logout"><Logout/></Route>}
                {loggedIn && <Route exact path="/users/detailsProfile"><DetailsProfile user={user}/></Route>}
                {!userRole && loggedIn && <Route exact path="/users/user-details"><DetailsProfile user={user}/></Route>}
                <Route><Home/></Route>
            </Switch>
        </div>

    );

};

export default Body;
