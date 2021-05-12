import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import fields from '../modules/field';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    fields: fields.reducer
});

export default rootReducer;
