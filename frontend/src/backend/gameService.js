import {config, appFetch} from './appFetch';

export const getGamesByUserId = ({page}, userId, onSuccess) =>
    appFetch(`/games/users/${userId}?page=${page}`, config('GET'), onSuccess);

export const getGamesByUserIdPending = (userId, onSuccess) =>
    appFetch(`/games/users/${userId}/pending`, config('GET'), onSuccess);

export const findGameById = (id, onSuccess) => 
    appFetch(`/games/${id}`, config('GET'), onSuccess);

export const addToGame = (body, onSuccess, onErrors) => {
    const gameId = body["gameId"];
    appFetch(`/games/${gameId}/users`, config('POST', body), 
        onSuccess, onErrors);
}

export const addToTeam = (body, gameId, onSuccess, onErrors) => {
    const teamId = body["teamId"];
    appFetch(`/games/${gameId}/teams/${teamId}/users`, config('POST', body), 
        onSuccess, onErrors);
}

export const getFinishedGames = ({page, firstName, login,  millisInitDate,  millisFinalDate}, onSuccess) => {
    var params = `?page=${page}`;
    if(login){
        params += `&login=${login}`
    }
    if(firstName){
        params += `&name=${firstName}`
    }
    if(millisInitDate){
        params += `&millisInitDate=${millisInitDate}`
    }
    if(millisFinalDate){
        params += `&millisFinalDate=${millisFinalDate}`
    }
    appFetch(`/games/finished` + params, config('GET'), onSuccess); 
}

export const getPublishedGames = ({page}, {initDateMillis, finalDateMillis}, onSuccess) =>
    appFetch(`/games/published?page=${page}&initDateMillis=${initDateMillis}&finalDateMillis=${finalDateMillis}`, config('GET'), onSuccess);

export const getGamesByDate = (initDate, finalDate, onSuccess) =>
    appFetch(`/games?initMillis=${initDate}&finalMillis=${finalDate}`, config('GET'), onSuccess);

export const getGamesFiltered = (initDate, finalDate, level, userId, onSuccess) =>
    appFetch(`/games?initMillis=${initDate}&finalMillis=${finalDate}&level=${level}&userId=${userId}`, config('GET'), onSuccess);
    
export const addGame = (game, onSuccess, onErrors) =>
    appFetch(`/games`, config('POST', game), onSuccess, onErrors); 
    
export const updateGame = (game, onSuccess, onErrors) => {
    const gameId = game["gameId"];
    appFetch(`/games/${gameId}`, config('PUT', game), onSuccess, onErrors);  
}

export const addSetList = (sets, gameId, onSuccess) =>
    appFetch(`/games/${gameId}/score`, config('POST', sets), onSuccess);

export const deleteGame = (gameId, onSuccess) =>
    appFetch(`/games/${gameId}`, config('DELETE'), onSuccess);

export const deleteScoreGame = (gameId, onSuccess) =>
    appFetch(`/games/${gameId}/score`, config('DELETE'), onSuccess);

export const deleteFromGame = (userId, gameId, onSuccess) =>
    appFetch(`/games/${gameId}/users/${userId}`, config('DELETE'), onSuccess);

export const deleteFromTeam = (userId, teamId, gameId, onSuccess) =>
    appFetch(`/games/${gameId}/teams/${teamId}/users/${userId}`, config('DELETE'), onSuccess);

export const rentField = (gameId, userId, onSuccess) =>
    appFetch(`/games/rentField`, config('POST', 
        {
            gameId: gameId,
            userId: userId
        }
    ), onSuccess);