import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Errors} from '../../common';

import * as selectors from '../selectors';
import * as actions from '../actions';
import field from '../../field';
import {useHistory} from 'react-router-dom';

const UpdateGame = () => {

    const obtainStringFromHour = (date) => {
        return date.getHours() + ':' + date.getMinutes();
    }

    const fields = useSelector(field.selectors.getAllFields);
    const dispatch = useDispatch();
    const gameObtained = useSelector(selectors.getGameObtained);
    const initDateObtained = gameObtained ? new Date(gameObtained.millisInitDate) : undefined;
    const finalDateObtained = gameObtained ? new Date(gameObtained.millisFinalDate) : undefined;
    const [minimunLevel, setMinimunLevel] = useState(gameObtained && gameObtained.minimunLevel);
    const [maximunLevel, setMaximunLevel] = useState(gameObtained && gameObtained.maximunLevel);
    const [date, setDate] = useState(gameObtained && new Date(gameObtained.millisInitDate).toISOString().substr(0, 10));
    const [initDate, setInitDate] = useState(gameObtained && obtainStringFromHour(initDateObtained));
    const [finalDate, setFinalDate] = useState(gameObtained && obtainStringFromHour(finalDateObtained));
    const [fieldValue, setFieldValue] = useState(gameObtained.fieldId);
    const [backendErrors, setBackendErrors] = useState(null);
    const id = gameObtained.gameId;
    const history = useHistory();
    let form;

    const addTimeToDate = (date, hour) => {
        const hourData = hour.trim().split(':');
        date.setHours(0);
        date.setHours(date.getHours() + hourData[0]);
        date.setMinutes(date.getMinutes() + hourData[1]);
        return date;
    }


    const handleUpdate = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            const dateBodyInit = new Date(date);
            const dateBodyFinal = new Date(date);
            const initDateBody = addTimeToDate(dateBodyInit, initDate);
            const finalDateBody = addTimeToDate(dateBodyFinal, finalDate);

            dispatch(actions.updateGame(
                {
                    gameId: Number(id),
                    millisInitDate: Number(initDateBody.getTime()),
                    millisFinalDate: Number(finalDateBody.getTime()),
                    minimunLevel: Number(minimunLevel),
                    maximunLevel: Number(maximunLevel),
                    fieldId: Number(fieldValue ? fieldValue : fields[0].fieldId)
                },
                () => {
                    dispatch(actions.findGameById(id));
                    history.push(`/games/game-details/${gameObtained.gameId}`);
                },
                errors => setBackendErrors(errors)
            ));
            

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    const onChangeSelectField = (value) => {
        setFieldValue(value);
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.games.updateGame.title"/>
                </h5>
                <form ref={node => form = node}
                                    className="needs-validation" noValidate 
                                    onSubmit={e => handleUpdate(e)}>
                    <div className="card-body">
                        <div className="form-group row">
                            <label htmlFor="minimunLevel" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.global.fields.minimunLevel"/>
                            </label>
                            <div className="col-md-6">
                                <input type="number" id="minimunLevel" className="form-control"
                                    defaultValue={minimunLevel}
                                    onChange={e => setMinimunLevel(e.target.value)}
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
                                    onChange={e => setMaximunLevel(e.target.value)}
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
                                    onChange={e => setDate(e.target.value)}
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
                                    onChange={e => setInitDate(e.target.value)}
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
                                    onChange={e => setFinalDate(e.target.value)}
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
                            <label htmlFor="fieldName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.global.fields.fieldName"/>
                            </label>
                            <select defaultValue={fieldValue} onChange={e => onChangeSelectField(e.target.value)}>
                                {fields ?
                                    fields.map((field) => {
                                        return (
                                            <option key={field.fieldId} value={field.fieldId}>{field.fieldId}</option>
                                        )
                                    })
                                : undefined}
                            </select>
                        </div>
                </div>
                    <div className="form-group row">
                        <div className="offset-md-6 col-md-2">
                            <button type="submit" className="btn btn-primary">
                                <FormattedMessage id="project.games.updateGame.title"/>
                            </button>
                        </div>
                    </div>
            </form>
            </div>
        </div>
    );

}

export default UpdateGame;