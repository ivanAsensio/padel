import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    user: null,
    users: null,
    userObtained: null,
    schedules: null,
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

const userObtained = (state = initialState.userObtained, action) => {

    switch (action.type) {

        case actionTypes.FIND_USER_BY_ID_COMPLETED:
            return action.userObtained;

        case actionTypes.CLEAR_USER:
            return initialState.userObtained;

        default:
            return state;

    }

}

const schedules = (state = initialState.schedules, action) => {

    switch (action.type) {

        case actionTypes.GET_ALL_SCHEDULES_COMPLETED:
            return action.schedules;

        default:
            return state;

    }

}

const reducer = combineReducers({
    user,
    users,
    userObtained,
    schedules
});

export default reducer;


