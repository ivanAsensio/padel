import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    gamesUser: null,
    gameObtained: null
};

const gamesUser = (state = initialState.gamesUser, action) => {

    switch (action.type) {

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


const reducer = combineReducers({
    gamesUser,
    gameObtained,
});

export default reducer;