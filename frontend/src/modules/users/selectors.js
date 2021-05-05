const getModuleState = state => state.users;

export const getUser = state => 
    getModuleState(state).user;

export const isLoggedIn = state =>
    getUser(state) !== null

export const getLogin = state => 
    isLoggedIn(state) ? getUser(state).login : null;

export const getUserRole = state => 
    isLoggedIn(state) ? getUser(state).role : null;

export const getAllUsers = state =>
    getModuleState(state).users;



