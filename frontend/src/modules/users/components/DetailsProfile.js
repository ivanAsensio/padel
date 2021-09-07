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
        <div className="container bootstrap snippet d-flex">
            <div className="p-2">
                <div className="row">
                    <h1 htmlFor="login" className="col-sm-10 font-weight-bold">
                        {userObtained.login && userObtained.login}
                    </h1>
                </div>
                <div className="row d-flex">
                    <div className="text-center p-2 col-md-5">
                        <img src={user && user.user.image ? user.user.image : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"} className="rounded-circle" alt="avatar"></img>
                    </div>
                    <div className="p-2 col-md-7">
                        <div className="tab-content">
                            <div htmlFor="name" className="col-xs-6">
                                <label htmlFor="name" className="col-md-12 col-form-label">
                                    <label className="font-weight-bold"><FormattedMessage id="project.global.fields.firstName"/></label>
                                    :&nbsp;
                                    <label >{userObtained.name&& userObtained.name}</label>
                                </label>
                            </div>
                            <div htmlFor="lastName">
                                <label htmlFor="lastName" className="col-md-12 col-form-label">
                                    <label className="font-weight-bold"><FormattedMessage id="project.global.fields.lastNames"/></label>
                                    :&nbsp;{userObtained.lastName1 && userObtained.lastName2 && userObtained.lastName1.concat(' ', userObtained.lastName2)}
                                </label>
                            </div>
                            <div htmlFor="level" className="col-xs-6">
                                <label htmlFor="level" className="col-md-12 col-form-label">
                                <label className="font-weight-bold"><FormattedMessage id="project.global.fields.level"/></label>
                                    :&nbsp;{userObtained.level && userObtained.level}
                                </label>
                            </div>
                            <div htmlFor="role" className="col-xs-6">
                                <label htmlFor="role" className="col-md-12 col-form-label">
                                    <label className="font-weight-bold"><FormattedMessage id="project.global.fields.firstName"/></label>
                                    :&nbsp;{userObtained.role && userObtained.role}
                                </label>
                            </div>
                            <div htmlFor="position" className="col-xs-6">
                                <label htmlFor="position" className="col-md-12 col-form-label">
                                <label className="font-weight-bold"><FormattedMessage id="project.global.fields.position"/></label>
                                    :&nbsp;{userObtained.position && userObtained.position}
                                </label>
                            </div>
                            <div htmlFor="state" className="col-xs-6">
                                <label htmlFor="state" className="col-md-12 col-form-label">
                                    <label className="font-weight-bold"><FormattedMessage id="project.global.fields.state"/></label>  
                                    :&nbsp;{
                                        userObtained.state ? 
                                            <FormattedMessage id="project.global.fields.state.true"/>  
                                        :   <FormattedMessage id="project.global.fields.state.false"/>  
                                    }                       
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="ml-auto p-2 col-md-5">
                <ScheduleList schedules={schedules} user={userObtained}></ScheduleList>
            </div>
        </div>
    );

}

export default DetailsProfile;