import React from 'react';
import Select from 'react-select';
import * as actions from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { BtnAddGuest } from '..';
import * as selectors from '../selectors';
import { FormattedMessage } from 'react-intl';


const UsersSelectGame = ({gameId, teamId, typeGame, setBackendErrors}) => {
   
    const usersGameObtained = useSelector(selectors.getUsersGameFiltered);
    const usersGameFiltered = usersGameObtained ? usersGameObtained.filter(user => user.state === true) : undefined;
    const options = usersGameFiltered.length !== 0 ? 
    usersGameFiltered.map((user) => {return ({
        value: user.id,
        label: user.login + " " + user.level
    })})
    : [];

    const dispatch = useDispatch();

    const handleClick = (value) => {

        if(typeGame === 'Pro'){
            actions.addToTeam(
                Number(gameId),
                {userId: Number(value),
                teamId: Number(teamId)},
                () => dispatch(actions.findGameById(gameId)),
                errors => setBackendErrors(errors)
            );
        }

        actions.addToGame(
            {
                userId: Number(value),
                gameId: Number(gameId)
            },
            () => dispatch(actions.findGameById(gameId)),
            errors => setBackendErrors(errors)
        );
    }
    return (
        <div>
            {options.length !== 0 ? 
                <Select options={options}
                onChange={(event) => handleClick(event.value)}/>
            : <FormattedMessage id="project.users.getUsersResult.noUsers"/>}
            {typeGame === 'Amateur' && <div className="p-2">
                <BtnAddGuest gameId={gameId} teamId={teamId} setBackendErrors={setBackendErrors} typeGame={typeGame}/>
            </div>}
       </div>
    );

}

UsersSelectGame.propTypes = {
    gameId: PropTypes.string.isRequired
}

export default UsersSelectGame;