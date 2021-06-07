import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import * as actions from "../actions";
import {useHistory} from 'react-router-dom';

const FinishedGameList = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(actions.getFinishedGames({page: 0}));
        history.push('/games/gamesUserList-result');
    });

    return null;

};


export default FinishedGameList;