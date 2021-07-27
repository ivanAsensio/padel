import React, { useState } from 'react';
import {FormattedMessage} from 'react-intl';
import { useSelector } from 'react-redux';
import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors} from '../../common';

const ScheduleList = (user) => {

    const schedules = useSelector(selectors.getAllSchedules);

    const [day, setDay] = useState("Monday");
    const [initHour, setInitHour] = useState('');
    const [finalHour, setFinalHour] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [showAdd, setShowAdd] = useState(false);

    let form;

    const handleAdd = () => {
        setShowAdd(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            
            const schedule = {
                day: day,
                initHour: initHour,
                finalHour: finalHour
            }
            actions.addSchedule(user.user.id, schedule);
            
        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }
    };

    const onChangeSelect = (value) => {
        setDay(value);
    };

    const padLeadingZeros = (num, size)  => {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    return (

        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <button type="button" onClick={handleAdd}>Añadir</button>
            {schedules != null ? 

                <div>
                    {schedules.length === 0 ?
                        <div>
                            <div className="alert alert-info" role="alert">
                                <FormattedMessage id='project.users.getSchedules.noSchedules'/>
                            </div>
                        </div>
                    : 
                    undefined}
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <FormattedMessage id='project.global.fields.day'/>
                                    </th>
                                    <th scope="col">
                                        <FormattedMessage id='project.global.fields.initHour'/>
                                    </th>
                                    <th scope="col">
                                        <FormattedMessage id='project.global.fields.finalHour'/>
                                    </th>
                                </tr>
                            </thead>
        
                            <tbody>
                                {schedules.map(schedule => 
                                    <tr key={schedule.scheduleId}>
                                        <td>
                                            <label className="col-md-6 col-form-label">
                                                {schedule.day}
                                            </label>
                                        </td>
                                        <td>
                                            <label className="col-md-6 col-form-label">
                                                {padLeadingZeros(schedule.initHour/60, 2)}:{padLeadingZeros(schedule.initHour % 60, 2)}
                                            </label>
                                        </td>
                                        <td>
                                            <label className="col-md-6 col-form-label">
                                                {padLeadingZeros(schedule.finalHour/60, 2)}:{padLeadingZeros(schedule.finalHour % 60, 2)}
                                            </label>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
        
                        </table>
        
                </div>
                : <table className="table table-striped table-hover"></table>}
                {showAdd ? 
                <div>
                    <form ref={node => form = node}
                        className="needs-validation" noValidate 
                        onSubmit={e => handleSubmit(e)}>
                        <select defaultValue={day} onChange={e => onChangeSelect(e.target.value)}>
                            <FormattedMessage id="project.global.day.monday">
                                {(message) => <option value="Monday">{message}</option>}
                            </FormattedMessage>
                            <FormattedMessage id="project.global.day.tuesday">
                                {(message) => <option value="Tuesday">{message}</option>}
                            </FormattedMessage>
                            v<FormattedMessage id="project.global.day.wednesday">
                                {(message) => <option value="Wednesday">{message}</option>}
                            </FormattedMessage>
                            <FormattedMessage id="project.global.day.thursday">
                                {(message) => <option value="Thrusday">{message}</option>}
                            </FormattedMessage>
                            <FormattedMessage id="project.global.day.friday">
                                {(message) => <option value="Friday">{message}</option>}
                            </FormattedMessage>
                            <FormattedMessage id="project.global.day.saturday">
                                {(message) => <option value="Saturday">{message}</option>}
                            </FormattedMessage>
                            <FormattedMessage id="project.global.day.sunday">
                                {(message) => <option value="Sunday">{message}</option>}
                            </FormattedMessage>
                        </select>
                        <input id="initHour" type="text" onChange={e => setInitHour(e.target.value)} placeholder="InitHour"/>
                        <input id="finalHour" type="text" onChange={e => setFinalHour(e.target.value)} placeholder="FinalHour"/>
                        <button type="submit">Añadir horario</button>
                    </form>
                </div>
                : undefined}
            </div>

    );

}

export default ScheduleList;