import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from "../actions";
import * as actionsField from "../../field/actions";
import {useHistory} from 'react-router-dom';
import users from '../../users';

const CalendarGamesFiltered = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const today = new Date();

    const initDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const finalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 0, 0, 0);
    const user = useSelector(users.selectors.getUser);


    useEffect(() => {
        dispatch(actions.getGamesFiltered(Number(initDate.getTime()), Number(finalDate.getTime()), Number(user.level), Number(user.id)));
        dispatch(actionsField.getAllFields());
        history.push('/games/gameCalendar');

    });

    return null;

};


export default CalendarGamesFiltered;