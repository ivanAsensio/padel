import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import * as actions from "../actions";
import {useHistory} from 'react-router-dom';

const UserList = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        dispatch(actions.getAllUsers({page: 0}));
        history.push('/users/usersList-result');

    });

    return null;

};


export default UserList;