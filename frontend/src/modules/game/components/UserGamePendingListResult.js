import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import { Games } from '..';


const UserGamePendingListResult = () => {

    const games = useSelector(selectors.getGamesUser);

    if (!games) {
        return null;
    }

    if (games.games.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.games.getGamesResult.noGames'/>
            </div>
        );
    }

    return (
        <div>
            <Games games={games.games}/>
        </div>

    );

}

export default UserGamePendingListResult;