const getModuleState = state => state.users;

export const getUser = state => 
    getModuleState(state).user;

export const getUserObtained = state => 
    getModuleState(state).userObtained;

export const isLoggedIn = state =>
    getUser(state) !== null

export const getLogin = state => 
    isLoggedIn(state) ? getUser(state).login : null;

export const getUserRole = state => 
    isLoggedIn(state) ? getUser(state).role : null;

export const getAllUsers = state =>
    getModuleState(state).users;

export const getAllSchedules = state =>
    getModuleState(state).schedules;



