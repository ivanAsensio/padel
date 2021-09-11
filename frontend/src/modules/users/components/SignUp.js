import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';

const SignUp = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastName2, setLastName2] = useState('');
    const [level, setLevel] = useState('');
    const [position, setPosition]  = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    const [image, setImage] = useState(null);
    let form;
    let confirmPasswordInput;
    let imageInput;

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            
            resolve(reader.result);
          };
          reader.onerror = error => reject(error);
        });
    }

    const checkImageSize = (image) => {
        if(image){
            if(image.size > 20000){
                imageInput.setCustomValidity('error');
                return false;
            }
        }
        return true;
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        if (form.checkValidity() && checkConfirmPassword() && checkImageSize(image)) {

            if(image){
                getBase64(image).then((imageEncoded) => dispatch(actions.signUp(
                    {
                        login: userName.trim(),
                        password: password,
                        name: firstName.trim(),
                        lastName1: lastName.trim(),
                        lastName2: lastName2.trim(),
                        level: level.trim(),
                        position: position.trim(),
                        image: imageEncoded
                    },
                    () => history.push('/'),
                    errors => setBackendErrors(errors),
                    () => {
                        history.push('/users/login');
                        dispatch(actions.logout());
                    }
                )));
            }else{
                dispatch(actions.signUp(
                    {
                        login: userName.trim(),
                        password: password,
                        name: firstName.trim(),
                        lastName1: lastName.trim(),
                        lastName2: lastName2.trim(),
                        level: level.trim(),
                        position: position.trim(),
                        image: null
                    },
                    () => history.push('/'),
                    errors => setBackendErrors(errors),
                    () => {
                        history.push('/users/login');
                        dispatch(actions.logout());
                    }
                ));
            }
        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    const checkConfirmPassword = () => {

        if (password !== confirmPassword) {

            confirmPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const handleConfirmPasswordChange = value => {

        confirmPasswordInput.setCustomValidity('');
        setConfirmPassword(value);
        setPasswordsDoNotMatch(false);
    
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.users.SignUp.title"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node}
                        className="needs-validation" noValidate 
                        onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="userName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.userName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="userName" className="form-control"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.password"/>
                            </label>
                            <div className="col-md-4">
                                <input type="password" id="password" className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="confirmPassword" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.users.SignUp.fields.confirmPassword"/>
                            </label>
                            <div className="col-md-4">
                                <input ref={node => confirmPasswordInput = node}
                                    type="password" id="confirmPassword" className="form-control"
                                    value={confirmPassword}
                                    onChange={e => handleConfirmPasswordChange(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    {passwordsDoNotMatch ?
                                        <FormattedMessage id='project.global.validator.passwordsDoNotMatch'/> :
                                        <FormattedMessage id='project.global.validator.required'/>}
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.firstName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="firstName" className="form-control"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
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
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
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
                            <label htmlFor="level" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.level"/>
                            </label>
                            <div className="col-md-4">
                                <input type="number" step="0.01" id="level" className="form-control"
                                    value={level}
                                    onChange={e => setLevel(e.target.value)}
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
                            <label htmlFor="image" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.image"/>
                            </label>
                            <div className="col-md-4">
                                <input type="file" alt="" id="image" className="form-control"
                                    onChange={e => setImage(e.target.files[0])}
                                    ref={node => imageInput = node}
                                    />
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                            <label className="col-md-3 col-form-label">
                                <FormattedMessage id='project.global.validator.maxSizeFile'/>
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-3 col-md-2">
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="project.users.SignUp.title"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default SignUp;

