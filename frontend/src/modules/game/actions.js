import * as actionTypes from './actionTypes';
import backend from '../../backend';

export const getGamesByUserIdCompleted = (gamesUser) => ({
    type: actionTypes.GET_GAMES_BY_USER_ID_COMPLETED,
    gamesUser
});

export const getGamesByUserId = (criteria, userId) => dispatch =>
    backend.gameService.getGamesByUserId(criteria, userId, games => dispatch(getGamesByUserIdCompleted({criteria, games})));

export const previousGetGamesByUserIdResultPage = (criteria, userId) => 
    getGamesByUserId({page: criteria.page-1}, userId);

export const nextGetGamesByUserIdResultPage = (criteria, userId) => 
    getGamesByUserId({page: criteria.page+1}, userId);

const findGameByIdCompleted = gameObtained => ({
    type: actionTypes.FIND_GAME_BY_ID_COMPLETED,
    gameObtained
});

export const findGameById = id => dispatch => {
    backend.gameService.findGameById(id,
        game => dispatch(findGameByIdCompleted(game)));
}

export const addToGame = (body, onSuccess, onErrors) => {
    backend.gameService.addToGame(body, onSuccess, onErrors);
}

export const getFinishedGames = (criteria) => dispatch =>
    backend.gameService.getFinishedGames(criteria, games => dispatch(getGamesByUserIdCompleted({criteria, games})));


export const getPublishedGames = (criteria) => dispatch =>
    backend.gameService.getPublishedGames(criteria, games => dispatch(getGamesByUserIdCompleted({criteria, games})));

export const getGamesByDateCompleted = (gamesDate) => ({
    type: actionTypes.GET_GAMES_BY_DATE_COMPLETED,
    gamesDate
});

export const getGamesByDate = (initDate, finalDate) => dispatch =>
    backend.gameService.getGamesByDate(initDate, finalDate, games => dispatch(getGamesByDateCompleted(games)));
    