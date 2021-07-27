import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import field from '../../field';
import * as actions from '../actions';

const AddGame = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const today = new Date();

    const initDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const finalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 0, 0, 0);
    
    useEffect(() => {
        dispatch(field.actions.getAllFields());
        dispatch(actions.getGamesByDate(Number(initDate.getTime()),Number(finalDate.getTime())));
        history.push('/games/addGame');

    });

    return null;

};


export default AddGame;