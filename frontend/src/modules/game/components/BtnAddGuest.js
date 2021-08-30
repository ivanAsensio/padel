import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';


const BtnAddGuest = ({gameId, setBackendErrors}) => {

    let form;
    const dispatch = useDispatch();

    const handleAddGame = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            
            actions.addToGame(
                {gameId: Number(gameId)},
                () => {
                    dispatch(actions.findGameById(gameId));
                    
                },
                errors => setBackendErrors(errors)
            )
            
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
                        <FormattedMessage id="project.fields.addPlayerToGame.guest"/>
                    </button>
                </div>
            </div>
    </form>
    );
};

BtnAddGuest.propTypes = {
    gameId: PropTypes.string.isRequired
}

export default BtnAddGuest;