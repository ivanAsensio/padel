import {config, appFetch} from './appFetch';

export const getGamesByUserId = ({page}, userId, onSuccess) =>
    appFetch(`/games/user/${userId}?page=${page}`, config('GET'), onSuccess);

export const findGameById = (id, onSuccess) => 
    appFetch(`/games/${id}`, config('GET'), onSuccess);

export const addToGame = (body, onSuccess, onErrors) =>
    appFetch(`/games/addPlayerToGame`, config('POST', body), 
        onSuccess, onErrors);

export const getFinishedGames = ({page}, onSuccess) =>
    appFetch(`/games/findFinishedGames?page=${page}`, config('GET'), onSuccess);

export const getPublishedGames = ({page}, onSuccess) =>
    appFetch(`/games/findPublishedGames?page=${page}`, config('GET'), onSuccess);

export const getGamesByDate = (initDate, finalDate, onSuccess) =>
    appFetch(`/games/findGameByDate?initMillis=${initDate}&finalMillis=${finalDate}`, config('GET'), onSuccess);

export const getGamesFiltered = (initDate, finalDate, level, userId, onSuccess) =>
    appFetch(`/games/findGamesFiltered?initMillis=${initDate}&finalMillis=${finalDate}&level=${level}&userId=${userId}`, config('GET'), onSuccess);
    
export const addGame = (game, onSuccess, onErrors) =>
    appFetch(`/games/addGame`, config('POST', game), onSuccess, onErrors);    

export const addSetList = (sets, gameId, onSuccess) =>
    appFetch(`/games/scoreGame/${gameId}`, config('POST', sets), onSuccess);