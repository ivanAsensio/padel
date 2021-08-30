import React from 'react';
import propTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import { GameLink } from '../../common';


const Games = ({games}) => (

    games != null ? 

    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">
                    <FormattedMessage id='project.games.GamesList.title'/>
                </th>
            </tr>
        </thead>

        <tbody>
            {games.map(game =>
                <tr key={game.gameId}>
                    <GameLink gameId={game.gameId} minimunLevel={game.minimunLevel} maximunLevel={game.maximunLevel}
                        millisInitDate={game.millisInitDate} millisFinalDate={game.millisFinalDate} typeGame={game.typeGame}
                        numPlayers={game.users.length}/>
                </tr>
            )}
        </tbody>

    </table>
    : 
    <table className="table table-striped table-hover"></table>
);

Games.propTypes = {
    games: propTypes.array
}

export default Games;