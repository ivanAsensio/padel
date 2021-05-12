const getModuleState = state => state.fields;

export const getAllFields = state =>
    getModuleState(state).fields;

export const getField = state =>
    getModuleState(state).field;
