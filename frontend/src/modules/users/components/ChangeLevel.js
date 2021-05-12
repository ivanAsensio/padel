import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const ChangeLevel = () => {

    const userObtained = useSelector(selectors.getUserObtained);
    const dispatch = useDispatch();
    const history = useHistory();
    const [newLevel, setNewLevel] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.changeLevel(
                userObtained.id,
                {level: newLevel},
                () => history.push(`/users/user-details/${userObtained.id}`),
                errors => setBackendErrors(errors)
            ));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');
            
        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.global.buttons.changeLevel"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="newLevel" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.level"/>
                            </label>
                            <div className="col-md-4">
                                <input type="number" id="level" className="form-control"
                                    value={newLevel}
                                    onChange={e => setNewLevel(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <div className="offset-md-3 col-md-1">
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.save"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ChangeLevel;
