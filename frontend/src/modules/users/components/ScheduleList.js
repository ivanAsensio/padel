import React, { useState } from 'react';
import {FormattedMessage} from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors} from '../../common';
import Modal from 'react-bootstrap/Modal';
import users from '../../users';

const ScheduleList = (user) => {

    const schedules = useSelector(selectors.getAllSchedules);
    const userObtained = useSelector(users.selectors.getUser);
    const [day, setDay] = useState("MONDAY");
    const [initHour, setInitHour] = useState('');
    const [finalHour, setFinalHour] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const userRole = useSelector(users.selectors.getUserRole) !== "USER";
    const showAdd = userRole || (user.user.id === userObtained.id);

    let form;

    const obtainMinutes = (hour) => {
        const hourSplitted = hour.split(':');
        return Number(hourSplitted[0]) * 60 + Number(hourSplitted[1]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            
            const schedule = {
                day: day,
                initHour: obtainMinutes(initHour),
                finalHour: obtainMinutes(finalHour)
            }
            dispatch(actions.addSchedule(user.user.id, schedule));
            setShowModal(false);
            
        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }
    };

    const onChangeSelect = (value) => {
        setDay(value.toUpperCase());
    };

    const padLeadingZeros = (num, size)  => {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    const handleDelete = (event, schedule) => {
        event.preventDefault();
        dispatch(actions.deleteByScheduleId(schedule.scheduleId, user.user.id));
    }

    return (

        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <br></br>
            <h2 className="text-center font-weight-bold"><FormattedMessage id='project.scheduleList.title'/></h2>
            <br></br>
            { showAdd ?
                <button type="submit float-right" onClick={(e) => setShowModal(true)}><FormattedMessage id='project.scheduleList.addSchedule'/></button>
            : undefined}
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
                        <table className="table table-striped table-hover font-weight-bold">
                            <thead>
                                <tr className="text-center">
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
                                {schedules.map((schedule) => 
                                    <tr key={schedule.scheduleId}>
                                        <td>
                                            <label className="col-md-6 col-form-label">
                                                {schedule.day}
                                            </label>
                                        </td>
                                        <td>
                                            <label className="col-md-6 col-form-label">
                                                {padLeadingZeros(Math.trunc(schedule.initHour/60), 2)}:{padLeadingZeros(schedule.initHour % 60, 2)}
                                            </label>
                                        </td>
                                        <td>
                                            <label className="col-md-6 col-form-label">
                                                {padLeadingZeros(Math.trunc(schedule.finalHour/60), 2)}:{padLeadingZeros(schedule.finalHour % 60, 2)}
                                            </label>
                                        </td>
                                        <td>
                                            <form onSubmit={e => handleDelete(e, schedule)}>
                                                <button type="submit" className="btn btn-danger">
                                                    <FormattedMessage id="project.global.buttons.delete"/> 
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
        
                        </table>
        
                </div>
                : <table className="table table-striped table-hover"></table>}
                {
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <form ref={node => form = node}
                                        className="needs-validation" noValidate 
                                        onSubmit={e => handleSubmit(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title><FormattedMessage id="project.scheduleList.addSchedule"/></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <label><FormattedMessage id="project.global.fields.day"/></label>
                            <select className="form-control" defaultValue={day} onChange={e => onChangeSelect(e.target.value)} required>
                                <FormattedMessage id="project.global.day.monday">
                                    {(message) => <option value="MONDAY">{message}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="project.global.day.tuesday">
                                    {(message) => <option value="TUESDAY">{message}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="project.global.day.wednesday">
                                    {(message) => <option value="WEDNESDAY">{message}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="project.global.day.thursday">
                                    {(message) => <option value="THURSDAY">{message}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="project.global.day.friday">
                                    {(message) => <option value="FRIDAY">{message}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="project.global.day.saturday">
                                    {(message) => <option value="SATURDAY">{message}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="project.global.day.sunday">
                                    {(message) => <option value="SUNDAY">{message}</option>}
                                </FormattedMessage>
                            </select>
                            <label><FormattedMessage id="project.global.fields.initHour"/></label>
                            <input id="initHour" className="form-control" type="text" onChange={e => setInitHour(e.target.value)} pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" placeholder="HH:HH" required/>
                            <label><FormattedMessage id="project.global.fields.finalHour"/></label>
                            <input id="finalHour" className="form-control" type="text" onChange={e => setFinalHour(e.target.value)} pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" placeholder="HH:MM" required/>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" data-dismiss="modal"><FormattedMessage id="project.scheduleList.addSchedule"/></button>
                        </Modal.Footer>
                    </form>
                </Modal>
                
                }
            </div>

    );

}

export default ScheduleList;