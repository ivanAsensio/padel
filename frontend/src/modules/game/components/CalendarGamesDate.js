import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import * as actions from "../actions";
import * as actionsField from "../../field/actions";
import {useHistory} from 'react-router-dom';

const CalendarGamesDate = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const today = new Date();

    const initDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const finalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 0, 0, 0);


    useEffect(() => {
        dispatch(actions.getGamesByDate(Number(initDate.getTime()), Number(finalDate.getTime())));
        dispatch(actionsField.getAllFields());
        history.push('/games/gameCalendar');

    });

    return null;

};


export default CalendarGamesDate;