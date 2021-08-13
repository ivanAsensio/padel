import React, { useEffect } from 'react';
import {FormattedMessage} from 'react-intl';
import ScheduleList from './ScheduleList';
import * as actions from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../selectors';

const DetailsProfile = (user) => {

    const dispatch = useDispatch();
    const schedules = useSelector(selectors.getAllSchedules);

    useEffect(() => {
        dispatch(actions.getAllSchedules(user.user.id));
    }, []);

    const userObtained = user ? user.user : undefined;

    return (
        <div className="container bootstrap snippet">
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
                            :{userObtained.name&& userObtained.name}
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
                    <div htmlFor="role" className="col-xs-6">
                        <label htmlFor="role" className="col-md-6 col-form-label">
                            <FormattedMessage id="project.global.fields.role"/>
                            :{userObtained.role && userObtained.role}
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
            <div className="row">
                <ScheduleList schedules={schedules} user={userObtained}></ScheduleList>
            </div>
        </div>
    );

}

export default DetailsProfile;