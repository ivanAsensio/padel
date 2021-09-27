import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import * as actions from "../actions";
import {useHistory} from 'react-router-dom';

const PublishedGameList = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const obtainInitDate = () => {
        var initDate = new Date();
        initDate.setHours(0);
        initDate.setMinutes(0);
        initDate.setSeconds(0);
        return initDate.getTime();
    }

    const obtainFinalDate = () => {
        var finalDate = new Date();
        finalDate.setHours(23);
        finalDate.setMinutes(59);
        finalDate.setSeconds(59);
        return finalDate.getTime();
    }

    useEffect(() => {
        dispatch(actions.getPublishedGames({page: 0},
            {
                initDateMillis: obtainInitDate(),
                finalDateMillis: obtainFinalDate()
            }));
        history.push('/games/gamesUserList-result');
    });

    return null;

};


export default PublishedGameList;