import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';


const BtnAddPlayer = ({userId, gameId, teamId, setBackendErrors, typeGame}) => {

    let form;
    const dispatch = useDispatch()

    const handleAddGame = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            
            if(typeGame === 'Pro'){
                actions.addToTeam(
                    {userId: Number(userId),
                    teamId: Number(teamId)},
                    () => dispatch(actions.findGameById(gameId)),
                    errors => setBackendErrors(errors)
                );
            }

            actions.addToGame(
                {userId: Number(userId),
                gameId: Number(gameId)},
                () => dispatch(actions.findGameById(gameId)),
                errors => setBackendErrors(errors)
            );
            
        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    return (
    <form ref={node => form = node}
        className="needs-validation" noValidate 
        onSubmit={e => handleAddGame(e)}>
            <div className="form-group row">
                <div className="offset-md-3 col-md-2">
                    <button type="submit" className="btn btn-primary">
                        <FormattedMessage id="project.fields.addPlayerToGame.title"/>
                    </button>
                </div>
            </div>
    </form>
    );
};

BtnAddPlayer.propTypes = {
    gameId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    typeGame: PropTypes.string.isRequired
}

export default BtnAddPlayer;