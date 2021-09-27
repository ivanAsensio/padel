import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import field from '../../field';
import GameCalendar from './GameCalendar';


const AddGameForm = () => {

    const fields = useSelector(field.selectors.getAllFields);
    const dispatch = useDispatch();
    const history = useHistory();
    const [initDate, setInitDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [date, setDate] = useState('');
    const [minimunLevel, setMinimunLevel] = useState('');
    const [maximunLevel, setMaximunLevel] = useState('');
    const [typeGame, setTypeGame] = useState(null);
    const [fieldValue, setFieldValue] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const addTimeToDate = (date, hour) => {
        const hourData = hour.trim().split(':');
        date.setHours(0);
        date.setHours(date.getHours() + hourData[0]);
        date.setMinutes(date.getMinutes() + hourData[1]);
        return date;
    }

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            const dateBodyInit = new Date(date);
            const dateBodyFinal = new Date(date);
            const initDateBody = addTimeToDate(dateBodyInit, initDate);
            const finalDateBody = addTimeToDate(dateBodyFinal, finalDate);

            dispatch(actions.addGame(
                {
                    millisInitDate: Number(initDateBody.getTime()),
                    millisFinalDate: Number(finalDateBody.getTime()),
                    minimunLevel: Number(minimunLevel.trim()),
                    maximunLevel: Number(maximunLevel.trim()),
                    typeGame: Number(typeGame),
                    fieldId: Number(fieldValue ? fieldValue : fields[0].fieldId)
                },
                () => history.push('/'),
                errors => setBackendErrors(errors)
            ));
            

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }
  
    const onChangeSelect = (value) => {
        setTypeGame(value);
    };

    const onChangeSelectField = (value) => {
        setFieldValue(value);
    };

    const Calendar = React.memo(GameCalendar);

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="d-flex">
                <div className="col-md-8 p-2">
                    <Calendar></Calendar>
                </div>
                <div className="card bg-light border-dark p-2">
                    <h5 className="card-header">
                        <FormattedMessage id="project.games.addGame.title"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node}
                            className="needs-validation" noValidate 
                            onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="minimunLevel" className="col-md-6 col-form-label">
                                    <FormattedMessage id="project.global.fields.minimunLevel"/>
                                </label>
                                <div className="col-md-6">
                                    <input type="number" id="minimunLevel" className="form-control"
                                        defaultValue={minimunLevel}
                                        onBlur={e => setMinimunLevel(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="maximunLevel" className="col-md-6 col-form-label">
                                    <FormattedMessage id="project.global.fields.maximunLevel"/>
                                </label>
                                <div className="col-md-6">
                                    <input type="number" id="maximunLevel" className="form-control"
                                        defaultValue={maximunLevel}
                                        onBlur={e => setMaximunLevel(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-md-6 col-form-label">
                                    <FormattedMessage id="project.global.fields.day"/>
                                </label>
                                <div className="col-md-6">
                                    <input type="date" id="date" className="form-control"
                                        defaultValue={date}
                                        onBlur={e => setDate(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="initDate" className="col-md-6 col-form-label">
                                    <FormattedMessage id="project.global.fields.initDate"/>
                                </label>
                                <div className="col-md-6">
                                    <input type="text" id="initDate" className="form-control"
                                        defaultValue={initDate}
                                        onBlur={e => setInitDate(e.target.value)}
                                        placeHolder="HH:MM"
                                        pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="finalDate" className="col-md-6 col-form-label">
                                    <FormattedMessage id="project.global.fields.finalDate"/>
                                </label>
                                <div className="col-md-6">
                                    <input type="text" id="finalDate" className="form-control"
                                        defaultValue={finalDate}
                                        onBlur={e => setFinalDate(e.target.value)}
                                        placeHolder="HH:MM"
                                        pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="typeGame" className="col-md-6 col-form-label">
                                    <FormattedMessage id="project.global.fields.typeGame"/>
                                </label>
                                <select defaultValue="0" onChange={e => onChangeSelect(e.target.value)}>
                                    <option value="0">Amateur</option>
                                    <option value="1">Professional</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="fieldName" className="col-md-6 col-form-label">
                                    <FormattedMessage id="project.global.fields.fieldName"/>
                                </label>
                                <select defaultValue={fieldValue} onChange={e => onChangeSelectField(e.target.value)}>
                                    {fields ?
                                        fields.map((field) => {
                                            return (
                                                <option key={field.fieldId} value={field.fieldId}>{field.name}</option>
                                            )
                                        })
                                    : undefined}
                                </select>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-6 col-md-2">
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.games.addGame.title"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddGameForm;