import {config, appFetch} from './appFetch';

export const getAllFields = (onSuccess) =>
    appFetch(`/fields`, config('GET'), onSuccess);

export const addField = (field, onSuccess, onErrors) =>
    appFetch('/fields', config('POST', field), 
            onSuccess, onErrors);

export const updateField = (field, onSuccess, onErrors) => {
    const fieldId = field["fieldId"];
    appFetch(`/fields/${fieldId}`, config('PUT', field), 
            onSuccess, onErrors);
}

export const deleteField = ({fieldId}, onSuccess) =>
    appFetch(`/fields/${fieldId}`, config('DELETE'), onSuccess);

export const changeState = (state, onSuccess) => {
    const fieldId = state["id"];
    appFetch(`/fields/${fieldId}/changeState`, config('PUT', state), onSuccess);
}
