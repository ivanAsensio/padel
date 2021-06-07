import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../actions";
import {useHistory} from 'react-router-dom';
import users from '../../users';

const GameUserList = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(users.selectors.getUser);

    useEffect(() => {
        dispatch(actions.getGamesByUserId({page: 0}, Number(user.id)));
        history.push('/games/gamesUserList-result');

    });

    return null;

};


export default GameUserList;