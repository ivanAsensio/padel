import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import fields from '../modules/field';
import games from '../modules/game';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    fields: fields.reducer,
    games: games.reducer
});

export default rootReducer;
