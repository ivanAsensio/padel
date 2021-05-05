import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const UpdateProfile = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(user.name);
    const [lastName1, setLastName1]  = useState(user.lastName1);
    const [lastName2, setLastName2]  = useState(user.lastName2);
    const [position, setPosition]  = useState(user.position);
    const [state, setState]  = useState(user.state);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            
            dispatch(actions.updateProfile(
                {id: user.id,
                name: name.trim(),
                lastName1: lastName1.trim(),
                lastName2: lastName2.trim(),
                position: position.trim(),
                state: state.trim(),               
            },
                () => history.push('/'),
                errors => setBackendErrors(errors)));

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
                    <FormattedMessage id="project.users.UpdateProfile.title"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.firstName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="firstName" className="form-control"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lastName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.lastName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="lastName" className="form-control"
                                    value={lastName1}
                                    onChange={e => setLastName1(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lastName2" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.lastName2"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="lastName2" className="form-control"
                                    value={lastName2}
                                    onChange={e => setLastName2(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="position" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.position"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="position" className="form-control"
                                    value={position}
                                    onChange={e => setPosition(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="state" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.state"/>
                            </label>
                            <div className="col-md-4">
                                <select class="form-select" value={state} onChange={e => setState(e.target.value)}>
                                    <option value="true">
                                        True
                                    </option>
                                    <option value="false">
                                        False
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-3 col-md-3">
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

export default UpdateProfile;