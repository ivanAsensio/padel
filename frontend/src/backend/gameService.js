import {config, appFetch} from './appFetch';

export const getGamesByUserId = ({page}, userId, onSuccess) =>
    appFetch(`/games/user/${userId}?page=${page}`, config('GET'), onSuccess);

export const getGamesByUserIdPending = (userId, onSuccess) =>
    appFetch(`/games/users/${userId}/pendingGames`, config('GET'), onSuccess);

export const findGameById = (id, onSuccess) => 
    appFetch(`/games/${id}`, config('GET'), onSuccess);

export const addToGame = (body, onSuccess, onErrors) =>
    appFetch(`/games/addPlayerToGame`, config('POST', body), 
        onSuccess, onErrors);

export const addToTeam = (body, onSuccess, onErrors) =>
    appFetch(`/games/addPlayerToTeam`, config('POST', body), 
        onSuccess, onErrors);

export const getFinishedGames = ({page, login,  millisInitDate,  millisFinalDate}, onSuccess) => {
    var params = `?page=${page}`;
    if(login){
        params += `&login=${login}`
    }
    if(millisInitDate){
        params += `&millisInitDate=${millisInitDate}`
    }
    if(millisFinalDate){
        params += `&millisFinalDate=${millisFinalDate}`
    }
    appFetch(`/games/findFinishedGames` + params, config('GET'), onSuccess); 
}

export const getPublishedGames = ({page}, {initDateMillis, finalDateMillis}, onSuccess) =>
    appFetch(`/games/findPublishedGames?page=${page}&initDateMillis=${initDateMillis}&finalDateMillis=${finalDateMillis}`, config('GET'), onSuccess);

export const getGamesByDate = (initDate, finalDate, onSuccess) =>
    appFetch(`/games/findGameByDate?initMillis=${initDate}&finalMillis=${finalDate}`, config('GET'), onSuccess);

export const getGamesFiltered = (initDate, finalDate, level, userId, onSuccess) =>
    appFetch(`/games/findGamesFiltered?initMillis=${initDate}&finalMillis=${finalDate}&level=${level}&userId=${userId}`, config('GET'), onSuccess);
    
export const addGame = (game, onSuccess, onErrors) =>
    appFetch(`/games/addGame`, config('POST', game), onSuccess, onErrors); 
    
export const updateGame = (game, onSuccess, onErrors) =>
    appFetch(`/games/updateGame`, config('PUT', game), onSuccess, onErrors);  

export const addSetList = (sets, gameId, onSuccess) =>
    appFetch(`/games/scoreGame/${gameId}`, config('POST', sets), onSuccess);

export const deleteGame = (userId, onSuccess) =>
    appFetch(`/games/deleteGame/${userId}`, config('POST', 
        {
            userId: userId
        }
    ), onSuccess);

export const deleteScoreGame = (gameId, onSuccess) =>
    appFetch(`/games/deleteScoreGame/${gameId}`, config('POST', 
        {
            gameId: gameId
        }
    ), onSuccess);

export const deleteFromGame = (userId, gameId, onSuccess) =>
    appFetch(`/games/removeFromGame`, config('POST', 
        {
            userId: userId,
            gameId: gameId
        }
    ), onSuccess);

export const deleteFromTeam = (userId, teamId, onSuccess) =>
    appFetch(`/games/removeFromTeam`, config('POST', 
        {
            userId: userId,
            teamId: teamId
        }
    ), onSuccess);