import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {Login, SignUp, Logout, UpdateProfile, ChangePassword, DetailsProfile, UserList, UserListResult, UserDetails, ChangeLevel} from '../../users';
import users from '../../users';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import { FieldListResult, FieldList, AddField, UpdateField } from '../../field';

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
                {!userRole && loggedIn && <Route exact path="/users/user-details/:id"><UserDetails/></Route>}
                {!userRole && loggedIn && <Route exact path="/users/changeLevel"><ChangeLevel/></Route>}
                {!userRole && loggedIn && <Route exact path="/fields/fieldList"><FieldList/></Route>}
                {!userRole && loggedIn && <Route exact path="/fields/fieldsList-result"><FieldListResult/></Route>}
                {!userRole && loggedIn && <Route exact path="/fields/addField"><AddField/></Route>}
                {!userRole && loggedIn && <Route exact path="/fields/updateField"><UpdateField/></Route>}
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
