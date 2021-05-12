import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import * as actions from "../actions";
import {useHistory} from 'react-router-dom';

const FieldList = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        dispatch(actions.getAllFields());
        history.push('/fields/fieldsList-result');

    });

    return null;

};


export default FieldList;