import * as actionTypes from './actionTypes';
import backend from '../../backend';

export const getGamesByUserIdCompleted = (gamesUser) => ({
    type: actionTypes.GET_GAMES_BY_USER_ID_COMPLETED,
    gamesUser
});

export const getGamesByUserId = (criteria, userId) => dispatch => {
    dispatch(clearGameUser());
    backend.gameService.getGamesByUserId(criteria, userId, games => dispatch(getGamesByUserIdCompleted({criteria, games})));
}
    
export const getGamesByUserIdPending = (userId) => dispatch => {
    dispatch(clearGameUser());
    backend.gameService.getGamesByUserIdPending(userId, games => dispatch(getGamesByUserIdCompleted({games}))); 
}
    
export const clearGameUser = () => ({
    type: actionTypes.CLEAR_GAMEUSER
})

export const previousGetGamesResultPage = (criteria, userId, userRole) => 
    userRole ? getGamesByUserId({...criteria, page: criteria.page-1}, userId) : getFinishedGames({...criteria, page: criteria.page-1});

export const nextGetGamesResultPage = (criteria, userId, userRole) => 
    userRole ? getGamesByUserId({page: criteria.page+1}, userId) : getFinishedGames({page: criteria.page+1});

const findGameByIdCompleted = gameObtained => ({
    type: actionTypes.FIND_GAME_BY_ID_COMPLETED,
    gameObtained
});

export const findGameById = id => dispatch => {
    backend.gameService.findGameById(id,
        game => {
            dispatch(findGameByIdCompleted(game));
            dispatch(findUsersByLevelAndDate(Number(game.minimunLevel), Number(game.maximunLevel), Number(game.millisInitDate)));
        });
}

export const addToGame = (body, onSuccess, onErrors) => {
    backend.gameService.addToGame(body, onSuccess, onErrors);
}

export const addToTeam = (body, onSuccess, onErrors) => {
    backend.gameService.addToTeam(body, onSuccess, onErrors);
}

export const getFinishedGames = (criteria) => dispatch => {
    dispatch(clearGameUser());
    backend.gameService.getFinishedGames(criteria, games => dispatch(getGamesByUserIdCompleted({criteria, games})));
}

export const getPublishedGames = (criteria, body) => dispatch => {
    dispatch(clearGameUser());
    backend.gameService.getPublishedGames(criteria, body, games => dispatch(getGamesByUserIdCompleted({criteria, games})));
}

export const getGamesByDateCompleted = (gamesDate) => ({
    type: actionTypes.GET_GAMES_BY_DATE_COMPLETED,
    gamesDate
});

export const getGamesByDate = (initDate, finalDate) => dispatch =>
    backend.gameService.getGamesByDate(initDate, finalDate, games => dispatch(getGamesByDateCompleted(games)));

export const getGamesFiltered = (initDate, finalDate, level, userId) => dispatch =>
    backend.gameService.getGamesFiltered(initDate, finalDate, level, userId, games => dispatch(getGamesByDateCompleted(games)));

export const addGame = (game, onSuccess, onErrors) => dispatch =>
    backend.gameService.addGame(game, onSuccess, onErrors);

export const updateGame = (game, onSuccess, onErrors) => dispatch =>
    backend.gameService.updateGame(game, game => {
        onSuccess();
        dispatch(findGameByIdCompleted(game));
    }, onErrors);

export const addSetCompleted = (sets) => ({
    type: actionTypes.ADD_SET_COMPLETED,
    sets
})

export const addSet = (sets) => dispatch =>
    dispatch(addSetCompleted(sets));

export const addSetList = (sets, gameId, onSuccess) => dispatch =>
    backend.gameService.addSetList(sets, gameId, onSuccess);

export const findUsersByLevelAndDateCompleted = (usersGameFiltered) => ({
    type: actionTypes.FIND_USERS_BY_LEVEL_AND_DATE_COMPLETED,
    usersGameFiltered
})

export const findUsersByLevelAndDate = (minimunLevel, maximunLevel, date) => dispatch => 
    backend.userService.findUsersByLevelAndDate(minimunLevel, maximunLevel, date, 
        (users) => dispatch(findUsersByLevelAndDateCompleted(users)));

export const deleteGame = (id, onSuccess) => 
    backend.gameService.deleteGame(id, onSuccess);

export const deleteScoreGame = (id, onSuccess) => 
    backend.gameService.deleteScoreGame(id, onSuccess);

export const deleteFromGame = (userId, gameId, onSuccess) => 
    backend.gameService.deleteFromGame(userId, gameId, onSuccess);

export const deleteFromTeam = (userId, teamId, onSuccess) => 
    backend.gameService.deleteFromTeam(userId, teamId, onSuccess);
    
    