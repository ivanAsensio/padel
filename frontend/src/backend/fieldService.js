import {config, appFetch} from './appFetch';

export const getAllFields = (onSuccess) =>
    appFetch(`/fields/fields`, config('GET'), onSuccess);

export const addField = (field, onSuccess, onErrors) =>
    appFetch('/fields/addField', config('POST', field), 
            onSuccess, onErrors);

export const updateField = (field, onSuccess, onErrors) =>
    appFetch('/fields/updateField', config('PUT', field), 
            onSuccess, onErrors);

export const deleteField = (id, onSuccess) =>
    appFetch('/fields/deleteField', config('POST', id), onSuccess);

export const changeState = (state, onSuccess) =>
    appFetch('/fields/changeState', config('PUT', state), onSuccess);
