import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory, Link, useParams} from 'react-router-dom';

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors} from '../../common';
import {BackLink} from '../../common';
import ScheduleList from './ScheduleList';
import users from '../../users';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const UserDetails = () => {



    const userObtained = useSelector(selectors.getUserObtained);
    const user = useSelector(users.selectors.getUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [backendErrors, setBackendErrors] = useState(null);
    const schedules = useSelector(selectors.getAllSchedules);
    const userRole = useSelector(users.selectors.getUserRole) !== "USER";

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

    const getPorcentage = (statistics) => {
        const totalGames = statistics.gamesWinned + statistics.gamesLossed;
        return statistics.gamesWinned * 100 / totalGames;
    }

    const porcentage = userObtained ? getPorcentage(userObtained.statistics) : undefined;
        
    return (
        <div>
            <BackLink></BackLink>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="container text-capitalize d-flex">
                    <div className="p-2 col-md-6">
                        <div className="row">     
                            <div className="col-md-12 d-flex">
                                <label className="p-2 font-weight-bold">
                                    <h1 className=" font-weight-bold">{userObtained.login && userObtained.login}</h1>
                                </label>
                                {userRole && <form ref={node => form = node} className="needs-validation p-2 ml-auto" noValidate onSubmit={e => handleSubmit(e)}>                             
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.global.buttons.changeLevel"/> 
                                    </button>
                                </form>}
                                {(userRole || user.id === userObtained.id) && <Link className="p-2" to="/users/update-profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                    </svg>
                                </Link>}
                            </div>
                        </div>
                        
                        <br></br>
                        <br></br>
                        <div className="row d-flex">
                            <div className="p-2 text-center col-md-5">
                                <img src={userObtained && userObtained.image ? userObtained.image : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"} className="rounded-circle img-fluid" alt="avatar"></img>
                            </div>
                            <div className="p-2 col-md-7">
                                <div htmlFor="name" className="col-xs-6">
                                    <label htmlFor="name" className="col-md-12 col-form-label">
                                        <label className="font-weight-bold"><FormattedMessage id="project.global.fields.firstName"/></label>
                                        :&nbsp;{userObtained.name && userObtained.name}
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
                        <div class="row col-xl-12 col-lg-10 mb-4">
                            <div class="bg-white rounded-lg shadow d-flex">
                                <div className="p-2 col-md-6">
                                    <label class="h6 font-weight-bold mb-4"><FormattedMessage id="project.global.fields.winRate"/></label>

                                    <CircularProgressbar value={porcentage} text={`${porcentage}%`} />
                                </div>

                                <div class="row text-center mt-4 p-2 col-md-6">
                                    <div className="col-12">
                                        <div class="h4 font-weight-bold mb-0">{userObtained.statistics.amateurGamesPlayed}</div><span class="small text-gray"><FormattedMessage id="project.global.fields.amateurGamesPlayed"/></span>
                                    </div>
                                    <div className="row text-center">
                                        <div class="col-6 border-right">
                                            <div class="h4 font-weight-bold mb-0">{userObtained.statistics.gamesWinned}</div><span class="small text-gray"><FormattedMessage id="project.global.fields.wonGames"/></span>
                                        </div>
                                        <div class="col-6">
                                            <div class="h4 font-weight-bold mb-0">{userObtained.statistics.gamesLossed}</div><span class="small text-gray"><FormattedMessage id="project.global.fields.lossedGames"/></span>
                                        </div>
                                    </div>              
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ml-auto p-2 col-md-6">
                        <ScheduleList schedules={schedules} user={userObtained}></ScheduleList>
                    </div>
                    
                </div>
            
                
        </div>
       
    );

}

export default UserDetails;