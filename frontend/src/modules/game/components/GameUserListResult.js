import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from '../../common';
import { Games } from '..';
import users from '../../users';


const GameUserListResult = () => {

    const games = useSelector(selectors.getGamesUser);
    const user = useSelector(users.selectors.getUser);
    const dispatch = useDispatch();

    if (!games) {
        return null;
    }

    if (games.games.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.games.getGamesResult.noGames'/>
            </div>
        );
    }

    return (

        <div>
            <Games games={games.games.items}/>
            <Pager 
                back={{
                    enabled: games.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousGetGamesByUserIdResultPage(games.criteria, Number(user.id)))}}
                next={{
                    enabled: games.games.items.existMoreItems,
                    onClick: () => dispatch(actions.nextGetGamesByUserIdResultPage(games.criteria, Number(user.id)))}}/>
        </div>

    );

}

export default GameUserListResult;