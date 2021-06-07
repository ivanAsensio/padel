import {init} from './appFetch';
import * as userService from './userService';
import * as fieldService from './fieldService';
import * as gameService from './gameService';

export {default as NetworkError} from "./NetworkError";

export default {init, userService, fieldService, gameService};

