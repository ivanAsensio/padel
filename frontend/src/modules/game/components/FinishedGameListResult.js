import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from '../../common';
import { Games } from '..';
import users from '../../users';


const FinishedGameListResult = () => {

    const games = useSelector(selectors.getGamesUser);
    const user = useSelector(users.selectors.getUser);
    const userRole = useSelector(users.selectors.getUserRole) === "USER";
    const dispatch = useDispatch();
    const [login, setLogin] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [minHour, setMinHour] = useState("");
    const [maxHour, setMaxHour] = useState("");
    let form;

    const addTimeToDate = (date, hour) => {
        const hourData = hour.trim().split(':');
        date.setHours(0);
        if(hour){
            date.setHours(date.getHours() + hourData[0]);
            date.setMinutes(date.getMinutes() + hourData[1]);
        }       
        return date;
    }

    const handleSubmit = event => {
        event.preventDefault();

        const dateBodyInit = new Date(minDate);
        const dateBodyFinal = new Date(maxDate);
        const initDateBody = addTimeToDate(dateBodyInit, minHour);
        const finalDateBody = addTimeToDate(dateBodyFinal, maxHour);

        if (form.checkValidity()) {
            dispatch(actions.getFinishedGames({
                page: 0,
                login: login,
                millisInitDate: Number(initDateBody.getTime()),
                millisFinalDate: Number(finalDateBody.getTime())
            }));           
        }
    }

    if (!games) {
        return null;
    }

    return (
        
        <div>
            <div className="card bg-light border-dark ">
            <div className="card-body">
                <form ref={node => form = node}
                    className="needs-validation d-flex"
                    onSubmit={e => handleSubmit(e)}>
                    <div className="form-group p-2">
                        <label htmlFor="login" className="col-form-label">
                            <FormattedMessage id="project.global.fields.userName"/>
                        </label>
                        <input type="text" id="login" className="form-control"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            autoFocus/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="minDate" className="col-form-label">
                            <FormattedMessage id="project.global.fields.initDate"/>
                        </label>
                        <input type="date" id="minDate" className="form-control"
                            value={minDate}
                            onChange={e => setMinDate(e.target.value)}
                            autoFocus/>
                        <input type="text" id="minHour" className="form-control"
                            value={minHour}
                            placeholder="HH:MM"
                            pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                            onChange={e => setMinHour(e.target.value)}
                            autoFocus/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="maxDate" className="col-form-label">
                            <FormattedMessage id="project.global.fields.finalDate"/>
                        </label>
                        <input type="date" id="maxDate" className="form-control"
                            value={maxDate}
                            onChange={e => setMaxDate(e.target.value)}
                            autoFocus/>
                        <input type="text" id="maxHour" className="form-control"
                            value={maxHour}
                            placeoholder="HH:MM"
                            pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                            onChange={e => setMaxHour(e.target.value)}
                            autoFocus/>
                    </div>
                    <div className="form-group p-2">
                        <div className="offset-md-3 col-md-2">
                            <button type="submit" className="btn btn-primary">
                                <FormattedMessage id="project.userList.filter"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
            {games.games.items.length === 0 ?
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.games.getGamesResult.noGames'/>
            </div> :
            <div>
    <Games games={games.games.items}/>
    <Pager 
        back={{
            enabled: games.criteria.page >= 1,
            onClick: () => dispatch(actions.previousGetGamesResultPage(games.criteria, Number(user.id), userRole))}}
        next={{
            enabled: games.games.existMoreItems,
            onClick: () => dispatch(actions.nextGetGamesResultPage(games.criteria, Number(user.id), userRole))}}/>
        
            
            </div> }
            </div>

    );

}

export default FinishedGameListResult;