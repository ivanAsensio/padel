const getModuleState = state => state.games;

export const getGamesUser = state => 
    getModuleState(state).gamesUser;

export const getGameObtained = state => 
    getModuleState(state).gameObtained;