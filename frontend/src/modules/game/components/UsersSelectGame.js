import React from 'react';
import Select from 'react-select';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { BtnAddGuest } from '..';


const UsersSelectGame = ({users, gameId, teamId, typeGame, setBackendErrors}) => {
   
    const options = users.length !== 0 ? 
    users.map((user) => {return ({
        value: user.id,
        label: user.login + " " + user.level
    })})
    : [{
            value: 1,
            label: "login 3.5" 
        },
        {
            value: 2,
            label: "admin 2.5" 
        },
        {
            value: 3,
            label: "Julio99 3.5" 
        },
    ];

    const dispatch = useDispatch();

    const handleClick = (value) => {
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