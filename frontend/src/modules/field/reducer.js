import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    fields: null,
    field: null,
};

const fields = (state = initialState.fields, action) => {

    switch (action.type) {

        case actionTypes.GET_ALL_FIELDS_COMPLETED:
            return action.fields;

        default:
            return state;

    }

}

const field = (state = initialState.field, action) => {

    switch (action.type) {

        case actionTypes.GET_INFO_FIELD_COMPLETED:
            return action.field;

        default:
            return state;

    }

}


const reducer = combineReducers({
    fields,
    field
});

export default reducer;


