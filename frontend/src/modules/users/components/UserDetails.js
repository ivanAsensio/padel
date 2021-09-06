import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors} from '../../common';
import {BackLink} from '../../common';
import ScheduleList from './ScheduleList';

const UserDetails = () => {

    //const loggedIn = useSelector(users.selectors.isLoggedIn);
    const userObtained = useSelector(selectors.getUserObtained);
    const dispatch = useDispatch();
    const history = useHistory();
    const [backendErrors, setBackendErrors] = useState(null);
    const schedules = useSelector(selectors.getAllSchedules);

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
        <div>
            <BackLink></BackLink>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="container bootstrap snippet d-flex">
                    <div className="p-2">
                        <div className="row">     
                            <div className="col-md-12 d-flex">
                                <label className="p-2 font-weight-bold">
                                    <h1 className=" font-weight-bold">{userObtained.login && userObtained.login}</h1>
                                </label>
                                <form ref={node => form = node} className="needs-validation p-2 ml-auto" noValidate onSubmit={e => handleSubmit(e)}>                             
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.global.buttons.changeLevel"/> 
                                    </button>
                                </form>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="row">
                            <div className="text-center">
                                <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar"></img>
                            </div>
                            <div className="tab-content">
                                <div htmlFor="name" className="col-xs-6">
                                    <label htmlFor="name" className="col-md-12 col-form-label">
                                        <label className="font-weight-bold"><FormattedMessage id="project.global.fields.firstName"/></label>
                                        :{userObtained.name && userObtained.name}
                                    </label>
                                </div>
                                <div htmlFor="lastName">
                                    <label htmlFor="lastName" className="col-md-12 col-form-label">
                                        <label className="font-weight-bold"><FormattedMessage id="project.global.fields.lastNames"/></label>
                                        :{userObtained.lastName1 && userObtained.lastName2 && userObtained.lastName1.concat(' ', userObtained.lastName2)}
                                    </label>
                                </div>
                                <div htmlFor="level" className="col-xs-6">
                                    <label htmlFor="level" className="col-md-12 col-form-label">
                                        <label className="font-weight-bold"><FormattedMessage id="project.global.fields.level"/></label>
                                        :{userObtained.level && userObtained.level}
                                    </label>
                                </div>
                                <div htmlFor="position" className="col-xs-6">
                                    <label htmlFor="position" className="col-md-12 col-form-label">
                                        <label className="font-weight-bold"><FormattedMessage id="project.global.fields.position"/></label>
                                        :{userObtained.position && userObtained.position}
                                    </label>
                                </div>
                                <div htmlFor="state" className="col-xs-6">
                                    <label htmlFor="state" className="col-md-12 col-form-label">
                                        <label className="font-weight-bold"><FormattedMessage id="project.global.fields.state"/></label>  
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
                    <div className="ml-auto p-2">
                        <ScheduleList schedules={schedules} user={userObtained}></ScheduleList>
                    </div>
                </div>
                
        </div>
       
    );

}

export default UserDetails;