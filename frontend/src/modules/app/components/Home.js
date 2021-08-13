import React from 'react';
import {useSelector} from 'react-redux';
import FinishedGameList from "../../game/components/FinishedGameList";
import users from '../../users';
import PublishedGameList from '../../game/components/PublishedGameList';
import Login from '../../users/components/Login';

const Home = () => {

    const userRole = useSelector(users.selectors.getUserRole) === "USER";
    const user = useSelector(users.selectors.getUser);

    return (user ? (!userRole ? <FinishedGameList/> : <PublishedGameList/>) : <Login/>)

} 

export default Home;
