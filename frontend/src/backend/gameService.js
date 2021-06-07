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
    
    