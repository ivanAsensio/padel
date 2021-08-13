import {config, appFetch, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback} from './appFetch';

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch('/users/login', config('POST', {userName, password}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    appFetch('/users/loginFromServiceToken', config('POST'),
        authenticatedUser => onSuccess(authenticatedUser),
        () => removeServiceToken()
    );

}

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => {

    appFetch('/users/signUp', config('POST', user), 
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

}

export const logout = () => removeServiceToken();

export const updateProfile = (user, onSuccess, onErrors) =>
    appFetch(`/users/${user.id}`, config('PUT', user),
        onSuccess, onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess,
    onErrors) =>
    appFetch(`/users/${id}/changePassword`, 
        config('POST', {oldPassword, newPassword}),
        onSuccess, onErrors);

export const getAllUsers = ({page}, onSuccess) =>
    appFetch(`/users/users?page=${page}`, config('GET'), onSuccess);

export const findUserById = (id, onSuccess) => {
    appFetch(`/users/${id}`, config('GET'), onSuccess);
}

export const changeLevel = (id, level, onSuccess, onErrors) => {

    appFetch(`/users/${id}/changeLevel`, config('POST', level), 
        onSuccess, onErrors);
}

export const getAllSchedules = (userId, onSuccess) => {
    appFetch(`/users/getSchedules/${userId}`, config('GET'), onSuccess);
}

export const addSchedule = (userId, schedule, onSuccess) => {
    appFetch(`/users/schedules/${userId}`, config('POST', schedule), onSuccess);
}

export const findUsersByLevelAndDate = (minimunLevel, maximunLevel, date, onSuccess) => {
    appFetch(`/users/filteredUsers?minLevel=${minimunLevel}&maxLevel=${maximunLevel}&millis=${date}`, config('GET'), onSuccess);
}

export const deleteByScheduleId = (scheduleId, onSuccess) => {
    appFetch(`/users/deleteSchedules`, config('POST', {scheduleId: scheduleId}), onSuccess);
}