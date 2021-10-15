import * as actionTypes from './actionTypes';
import backend from '../../backend';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const signUpCompleted = authenticatedUser => ({
    type: actionTypes.SIGN_UP_COMPLETED,
    authenticatedUser
});

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.signUp(user,
        authenticatedUser => {
            dispatch(signUpCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback);

export const loginCompleted = authenticatedUser => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser
});

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.login(userName, password,
        authenticatedUser => {
            dispatch(loginCompleted(authenticatedUser));
            onSuccess();
            cookies.set('user',authenticatedUser, {path: '/'} );
        },
        onErrors,
        reauthenticationCallback
    );

export const tryLoginFromServiceToken = reauthenticationCallback => dispatch =>
    backend.userService.tryLoginFromServiceToken(
        authenticatedUser => {
            if (authenticatedUser) {
                dispatch(loginCompleted(authenticatedUser));
                cookies.set('user',authenticatedUser, {path: '/'} );
            }
        },
        reauthenticationCallback
    );

export const logout = () => {

    backend.userService.logout();
    cookies.set('user', undefined, {path: '/'});

    return {type: actionTypes.LOGOUT};

};

export const updateProfileCompleted = user => ({
    type: actionTypes.UPDATE_PROFILE_COMPLETED,
    user
})

export const updateProfile = (user, onSuccess, onErrors) => dispatch =>
    backend.userService.updateProfile(user, 
        user => {
            //dispatch(updateProfileCompleted(user));
            onSuccess();
        },
        onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors) => dispatch =>
    backend.userService.changePassword(id, oldPassword, newPassword, onSuccess, onErrors);

export const getAllUsersCompleted = (users) => ({
    type: actionTypes.GET_ALL_USERS_COMPLETED,
    users
});

export const getAllUsers = criteria => dispatch => 
    backend.userService.getAllUsers(criteria, users => dispatch(getAllUsersCompleted({criteria, users})));

export const previousGetUsersResultPage = criteria => 
    getAllUsers({...criteria, page: criteria.page-1});

export const nextGetUsersResultPage = criteria => 
    getAllUsers({...criteria, page: criteria.page+1});

export const findUserByIdCompleted = userObtained => ({
    type: actionTypes.FIND_USER_BY_ID_COMPLETED,
    userObtained
});

export const findUserById = id => dispatch => {
    backend.userService.findUserById(id,
        user => {
            dispatch(findUserByIdCompleted(user));
            dispatch(getAllSchedules(id));
        });
}

export const clearUserObtained = () => ({
    type: actionTypes.CLEAR_USER
})

export const changeLevel = (id, level, onSuccess, onErrors) => dispatch => {
    backend.userService.changeLevel(id, level, onSuccess, onErrors);
}

export const getAllSchedulesCompleted = (schedules) => ({
    type: actionTypes.GET_ALL_SCHEDULES_COMPLETED,
    schedules
});

export const getAllSchedules = userId => dispatch =>
    backend.userService.getAllSchedules(userId, schedules => dispatch(getAllSchedulesCompleted(schedules)));

export const addSchedule = (userId, schedule) => dispatch => 
    backend.userService.addSchedule(userId, schedule, () => dispatch(getAllSchedules(userId)));

export const deleteByScheduleId = (scheduleId, userId) => dispatch =>
    backend.userService.deleteByScheduleId(scheduleId, userId, () => dispatch(getAllSchedules(userId)));