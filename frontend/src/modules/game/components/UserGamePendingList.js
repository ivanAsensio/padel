import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../actions";
import {useHistory} from 'react-router-dom';
import users from '../../users';

const UserGamePendingList = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(users.selectors.getUser);

    useEffect(() => {
        dispatch(actions.getGamesByUserIdPending(Number(user.id)));
        history.push('/games/gamesUserListPending-result');

    });

    return null;

};


export default UserGamePendingList;