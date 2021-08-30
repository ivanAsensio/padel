import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    gamesUser: null,
    gameObtained: null,
    gamesDate: null,
    sets: [],
    usersGameFiltered: []
};

const gamesUser = (state = initialState.gamesUser, action) => {

    switch (action.type) {

        case actionTypes.CLEAR_GAMEUSER:
            return initialState.gamesUser;

        case actionTypes.GET_GAMES_BY_USER_ID_COMPLETED:
            return action.gamesUser;

        default:
            return state;

    }

}

const gameObtained = (state = initialState.gameObtained, action) => {

    switch (action.type) {

        case actionTypes.FIND_GAME_BY_ID_COMPLETED:
            return action.gameObtained;

        default:
            return state;

    }

}

const gamesDate = (state = initialState.gamesDate, action) => {

    switch (action.type) {

        case actionTypes.GET_GAMES_BY_DATE_COMPLETED:
            return action.gamesDate;

        default:
            return state;

    }

}

const sets = (state = initialState.sets, action) => {

    switch (action.type) {

        case actionTypes.ADD_SET_COMPLETED:
            return action.sets;

        default:
            return state;

    }

}

const usersGameFiltered = (state = initialState.usersGameFiltered, action) => {

    switch (action.type) {

        case actionTypes.FIND_USERS_BY_LEVEL_AND_DATE_COMPLETED:
            return action.usersGameFiltered;

        default:
            return state;

    }

}


const reducer = combineReducers({
    gamesUser,
    gameObtained,
    gamesDate,
    sets,
    usersGameFiltered,
});

export default reducer;