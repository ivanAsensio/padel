import * as actionTypes from './actionTypes';
import backend from '../../backend';

export const getAllFieldsCompleted = (fields) => ({
    type: actionTypes.GET_ALL_FIELDS_COMPLETED,
    fields
});

export const getAllFields = () => dispatch =>
    backend.fieldService.getAllFields(fields => dispatch(getAllFieldsCompleted(fields)));

export const addField = (field, onSuccess, onErrors)  =>
    backend.fieldService.addField(field, onSuccess, onErrors);

export const getInfoFieldCompleted = (field) => ({
    type: actionTypes.GET_INFO_FIELD_COMPLETED,
    field
});

export const getInfoField = (id, name, state) => dispatch =>
    dispatch(getInfoFieldCompleted({id, name, state}));

export const updateField = (field, onSuccess, onErrors)  =>
    backend.fieldService.updateField(field, onSuccess, onErrors);

export const deleteField = (id, onSuccess)  =>
    backend.fieldService.deleteField(id, onSuccess);

export const changeState = (state, onSuccess)  =>
    backend.fieldService.changeState(state, onSuccess);