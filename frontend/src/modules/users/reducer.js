import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    user: null,
    users: null
};

const user = (state = initialState.user, action) => {

    switch (action.type) {

        case actionTypes.SIGN_UP_COMPLETED:
            return action.authenticatedUser.user;

        case actionTypes.LOGIN_COMPLETED:
            return action.authenticatedUser.user;

        case actionTypes.LOGOUT:
            return initialState.user;

        case actionTypes.UPDATE_PROFILE_COMPLETED:
            return action.user;

        default:
            return state;

    }

}

const users = (state = initialState.users, action) => {

    switch (action.type) {

        case actionTypes.GET_ALL_USERS_COMPLETED:
            return action.users;

        default:
            return state;

    }

}

const reducer = combineReducers({
    user,
    users
});

export default reducer;


