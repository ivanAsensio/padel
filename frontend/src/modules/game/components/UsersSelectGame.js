import React from 'react';
import Select from 'react-select';
import * as actions from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { BtnAddGuest } from '..';
import * as selectors from '../selectors';


const UsersSelectGame = ({gameId, teamId, typeGame, setBackendErrors}) => {
   
    const usersGameFiltered = useSelector(selectors.getUsersGameFiltered);
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
            : null}
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