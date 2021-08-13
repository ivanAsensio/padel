import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors} from '../../common';
import {BackLink} from '../../common';

const UserDetails = () => {

    //const loggedIn = useSelector(users.selectors.isLoggedIn);
    const userObtained = useSelector(selectors.getUserObtained);
    const dispatch = useDispatch();
    const history = useHistory();
    const [backendErrors, setBackendErrors] = useState(null);
    const {id} = useParams();
    let form;

    useEffect(() => {

        const userId = Number(id);

        if (!Number.isNaN(userId)) {
            dispatch(actions.findUserById(userId));
        }

    }, [id, dispatch]);

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            history.push(`/users/changeLevel`);
        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    if (!userObtained) {
        return null;
    }
        
    return (
        <form ref={node => form = node} className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
            <BackLink></BackLink>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="container bootstrap snippet ">
                <div className="row">
                    <h1 htmlFor="login" className="col-sm-10">
                        {userObtained.login && userObtained.login}
                    </h1>
                </div>
                <div className="row">
                    <div className="text-center">
                        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar"></img>
                    </div>
                    <div className="tab-content">
                        <div htmlFor="name" className="col-xs-6">
                            <label htmlFor="name" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.global.fields.firstName"/>
                                :{userObtained.name && userObtained.name}
                            </label>
                        </div>
                        <div htmlFor="lastName">
                            <label htmlFor="lastName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.global.fields.lastName"/>
                                :{userObtained.lastName1 && userObtained.lastName2 && userObtained.lastName1.concat(' ', userObtained.lastName2)}
                            </label>
                        </div>
                        <div htmlFor="level" className="col-xs-6">
                            <label htmlFor="level" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.global.fields.level"/>
                                :{userObtained.level && userObtained.level}
                            </label>
                        </div>
                        <div htmlFor="position" className="col-xs-6">
                            <label htmlFor="position" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.global.fields.position"/>
                                :{userObtained.position && userObtained.position}
                            </label>
                        </div>
                        <div htmlFor="state" className="col-xs-6">
                            <label htmlFor="state" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.state"/>    
                                :{
                                    userObtained.state ? 
                                        <FormattedMessage id="project.global.fields.state.true"/>  
                                    :   <FormattedMessage id="project.global.fields.state.false"/>  
                                }                       
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <div className="form-group row">
                    <div className="offset-md-6 col-md-4">
                        <button type="submit" className="btn btn-primary">
                            <FormattedMessage id="project.global.buttons.changeLevel"/> 
                        </button>
                    </div>
                </div>
            </div>
        </form>
       
    );

}

export default UserDetails;