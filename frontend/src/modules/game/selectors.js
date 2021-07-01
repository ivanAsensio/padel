const getModuleState = state => state.games;

export const getGamesUser = state => 
    getModuleState(state).gamesUser;

export const getGamesDate = state => 
    getModuleState(state).gamesDate;

export const getGameObtained = state => 
    getModuleState(state).gameObtained;