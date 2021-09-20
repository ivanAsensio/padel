import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useParams} from 'react-router-dom';

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Errors, UserLink} from '../../common';
import BtnAddPlayer from './BtnAddPlayer';
import {BackLink} from '../../common';
import {FormattedDate, FormattedTime} from 'react-intl';
import Modal from 'react-bootstrap/Modal';
import users from '../../users';
import {Link} from 'react-router-dom';
import field from '../../field';
import UsersSelectGame from './UsersSelectGame';
import {useHistory} from 'react-router-dom';


const GameDetails = () => {

    const obtainStringFromHour = (date) => {
        return date.getHours() + ':' + date.getMinutes();
    }

    const gameObtained = useSelector(selectors.getGameObtained);
    const fields = useSelector(field.selectors.getAllFields);
    const usersGameFiltered = useSelector(selectors.getUsersGameFiltered);
    const user = useSelector(users.selectors.getUser);
    const userRole = useSelector(users.selectors.getUserRole) === "ADMIN";
    const history = useHistory();
    const dispatch = useDispatch();
    const initDateObtained = gameObtained ? new Date(gameObtained.millisInitDate) : undefined;
    const finalDateObtained = gameObtained ? new Date(gameObtained.millisFinalDate) : undefined;
    const [backendErrors, setBackendErrors] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [minimunLevel, setMinimunLevel] = useState(gameObtained ? gameObtained.minimunLevel : undefined);
    const [maximunLevel, setMaximunLevel] = useState(gameObtained ? gameObtained.maximunLevel : undefined);
    const [date, setDate] = useState(gameObtained ? gameObtained.millisInitDate : undefined);
    const [initDate, setInitDate] = useState(gameObtained ? obtainStringFromHour(initDateObtained) : undefined);
    const [finalDate, setFinalDate] = useState(gameObtained ? obtainStringFromHour(finalDateObtained) : undefined);
    const [fieldValue, setFieldValue] = useState(null);
    const {id} = useParams();
    const initDateString = gameObtained ? new Date(gameObtained.millisInitDate) : null;
    const finalDateString = gameObtained ? new Date(gameObtained.millisFinalDate) : null;
    const today = new Date();
    var userOnUserList = false;
    let form;

    useEffect(() => {

        const gameId = Number(id);

        if (!Number.isNaN(gameId)) {
            dispatch(actions.findGameById(gameId));
            dispatch(field.actions.getAllFields());
        }

    }, [id, dispatch]);

    const addTimeToDate = (date, hour) => {
        const hourData = hour.trim().split(':');
        date.setHours(0);
        date.setHours(date.getHours() + hourData[0]);
        date.setMinutes(date.getMinutes() + hourData[1]);
        return date;
    }

    const onChangeSelectField = (value) => {
        setFieldValue(value);
    };

    const handleDelete = (event, userId) => {
        event.preventDefault();

        actions.deleteFromGame(
            Number(userId),
            Number(id),
            () => dispatch(actions.findGameById(id)));
    }

    const handleDeleteFromTeam = (event, userId, teamId) => {
        event.preventDefault();

        actions.deleteFromTeam(
            Number(userId),
            Number(teamId),
            () => dispatch(actions.findGameById(id)));
    }

    const handleDeleteGame = (event) => {
        event.preventDefault();

        actions.deleteGame(
            Number(id),
            () => history.push("/"));
    }

    const handleDeleteScoreGame = (event) => {
        event.preventDefault();

        actions.deleteScoreGame(
            Number(id),
            () => dispatch(actions.findGameById(id)));
    }

    const handleUpdate = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            const dateBodyInit = new Date(date);
            const dateBodyFinal = new Date(date);
            const initDateBody = addTimeToDate(dateBodyInit, initDate);
            const finalDateBody = addTimeToDate(dateBodyFinal, finalDate);
            setShowModal(false);

            dispatch(actions.updateGame(
                {
                    gameId: Number(id),
                    millisInitDate: Number(initDateBody.getTime()),
                    millisFinalDate: Number(finalDateBody.getTime()),
                    minimunLevel: Number(minimunLevel.trim()),
                    maximunLevel: Number(maximunLevel.trim()),
                    fieldId: Number(fieldValue ? fieldValue : fields[0].fieldId)
                },
                () => {
                    dispatch(actions.findGameById(id));
                },
                errors => setBackendErrors(errors)
            ));
            

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    if(gameObtained && gameObtained.teams && gameObtained.teams.length !== 0){
        if(gameObtained.teams[0].name !== "Team 1"){
            gameObtained.teams = gameObtained.teams.reverse();
        }
    }

    if (!gameObtained) {
        return null;
    }else{
        userOnUserList = gameObtained.users.filter((userObtained) => userObtained.id === user.id).length !== 0;
    }

    const showAddButton = (!userRole && gameObtained && !userOnUserList) ? ((new Date(gameObtained.millisInitDate)) > today) : false

    return (
        <div>
            <BackLink></BackLink>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="container bootstrap snippet text-center bg-light">
                    <div className="d-flex">
                        <div className="col-md-10 p-2">
                            <div className="row">
                                <h3 htmlFor="date" className="col-sm-10">
                                    <FormattedDate value={initDateString} key={initDateString.getTime()}/>
                                    &nbsp;<FormattedTime value={initDateString} />
                                    - <FormattedDate value={finalDateString} key={finalDateString.getTime()}/>
                                    &nbsp;<FormattedTime value={finalDateString} />
                                </h3>
                            </div>
                            <div className="row">
                                <h3 htmlFor="level" className="col-sm-10">
                                    <FormattedMessage id="project.global.fields.minimunLevel"/>
                                    :&nbsp;{gameObtained.minimunLevel} - {gameObtained.maximunLevel}
                                </h3>
                            </div>
                            <div className="row">
                                <h3 htmlFor="typeGame" className="col-sm-10">
                                    <FormattedMessage id="project.global.fields.typeGame"/>
                                    :&nbsp;{gameObtained.typeGame}
                                </h3>
                            </div>
                            {gameObtained.sets.length !== 0 &&
                            <div className="text-center d-flex">
                                <label htmlFor="Sets" className="col-sm-10 p-2">
                                    {gameObtained.sets.map(set => <label key={set.id} className="h4">{set.result}&nbsp;&nbsp;&nbsp;</label>)}
                                </label>
                                {gameObtained && gameObtained.sets && gameObtained.sets.length !== 0 && <form className="p-2" onSubmit={e => handleDeleteScoreGame(e)}>
                                    <button type="submit" className="btn btn-danger">
                                        <FormattedMessage id="project.global.buttons.deleteScore"/> 
                                    </button>
                                </form>}
                            </div>    
                            }
                        </div>
                        {userRole &&
                        <div className="ml-auto p-2">
                            <div>
                                {userRole &&
                                    <button type="button" onClick={(e) => setShowModal(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </button>
                                }
                            </div>
                            <div>{gameObtained.typeGame === "Pro" && gameObtained.sets.length === 0 &&                              
                                <Link to={`/games/scoreGame`} className="me-auto">
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.global.fields.addScore"/> 
                                    </button>
                                </Link>
                            }
                                <form onSubmit={e => handleDeleteGame(e)}>
                                    <button type="submit" className="btn btn-danger">
                                        <FormattedMessage id="project.global.buttons.delete"/> 
                                    </button>
                                </form>
                            </div>                        
                        </div>
                        }
                    </div>
                        
                        {gameObtained.typeGame === "Pro" ?
                        <table className="table">
                            <thead>
                                    <tr>
                                        <th scope="col" className="col-md-6">  
                                            <div>
                                                <div className="d-flex">
                                                    <label className="p-2">{gameObtained.teams[0].name}</label>
                                                    {(gameObtained.teams[0].resultMatch) ? gameObtained.teams[0].resultMatch === "WIN" ? <label className="p-2 ml-auto">
                                                        <FormattedMessage id="project.global.resultMatch.win"/> </label> : <label className="p-2 ml-auto"><FormattedMessage id="project.global.resultMatch.defeat"/></label> : undefined}
                                                </div>
                                                
                                                {showAddButton && <BtnAddPlayer userId={user.id} gameId={id} teamId={gameObtained.teams[0].id} setBackendErrors={setBackendErrors} typeGame={gameObtained.typeGame}/>}
                                            </div>
                                        </th>
                                        <th scope="col" className="col-md-6">
                                            <div>
                                                <div className="d-flex">
                                                    <label className="p-2">{gameObtained.teams[1].name}</label>
                                                    {gameObtained.teams[1].resultMatch ? gameObtained.teams[1].resultMatch === "WIN" ? <label className="p-2 ml-auto">
                                                        <FormattedMessage id="project.global.resultMatch.win"/> </label> : <label className="p-2 ml-auto"><FormattedMessage id="project.global.resultMatch.defeat"/></label> : undefined}
                                                </div>
                                                {showAddButton && <BtnAddPlayer userId={user.id} gameId={id} teamId={gameObtained.teams[1].id} setBackendErrors={setBackendErrors} typeGame={gameObtained.typeGame}/>}
                                            </div>
                                        </th>
                                        
                                    </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>{gameObtained.teams[0].users[0] ?
                                            <div className="d-flex">
                                                <UserLink className="p-2 mr-auto" id={gameObtained.teams[0].users[0].id} user={gameObtained.teams[0].users[0]}/>
                                                {(userRole  || gameObtained.teams[0].users[0].id === user.id) &&
                                                    <form className="p-2 ml-auto" onSubmit={e => {
                                                        handleDelete(e, gameObtained.teams[0].users[0].id);
                                                        handleDeleteFromTeam(e, gameObtained.teams[0].users[0].id, gameObtained.teams[0].id);
                                                    }}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>
                                                } 
                                            </div> 
                                            : userRole ? <UsersSelectGame typeGame={gameObtained.typeGame} teamId={gameObtained.teams[0].id} users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> :
                                                <FormattedMessage id="project.global.field.empty"/>
                                        }</td>
                                        <td>{gameObtained.teams[1].users[0] ? 
                                            <div className="d-flex justify-content-center">
                                                <UserLink className="p-2" id={gameObtained.teams[1].users[0].id} user={gameObtained.teams[1].users[0]}/>
                                                {(userRole  || gameObtained.teams[1].users[0].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => {
                                                            handleDelete(e, gameObtained.teams[1].users[0].id);
                                                            handleDeleteFromTeam(e, gameObtained.teams[1].users[0].id, gameObtained.teams[1].id);
                                                        }}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>
                                                }
                                            </div>
                                            : userRole ? <UsersSelectGame typeGame={gameObtained.typeGame} teamId={gameObtained.teams[1].id} users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> :
                                                <FormattedMessage id="project.global.field.empty"/>}
                                        </td>   
                                    </tr>
                                    <tr>
                                        <td>{gameObtained.teams[0].users[1] ? 
                                        <div className="d-flex justify-content-center">
                                            <UserLink className="p-2"id={gameObtained.teams[0].users[1].id} user={gameObtained.teams[0].users[1]}/>
                                            {(userRole  || gameObtained.teams[0].users[1].id === user.id) &&
                                                <form className="p-2" onSubmit={e => {
                                                        handleDelete(e, gameObtained.teams[0].users[1].id);
                                                        handleDeleteFromTeam(e, gameObtained.teams[0].users[1].id, gameObtained.teams[0].id);
                                                    }}>
                                                    <button type="submit" className="btn btn-danger">
                                                        <FormattedMessage id="project.global.buttons.delete"/> 
                                                    </button>
                                                </form>
                                            }
                                        </div>
                                            : userRole ? <UsersSelectGame typeGame={gameObtained.typeGame} teamId={gameObtained.teams[0].id} users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> :
                                                <FormattedMessage id="project.global.field.empty"/>}
                                        </td>
                                        <td>{
                                            gameObtained.teams[1].users[1] ? 
                                            <div className="d-flex justify-content-center">
                                                <UserLink className="p-2" id={gameObtained.teams[1].users[1].id} user={gameObtained.teams[1].users[1]}/> 
                                                {(userRole  || gameObtained.teams[1].users[1].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => {
                                                            handleDelete(e, gameObtained.teams[1].users[1].id);
                                                            handleDeleteFromTeam(e, gameObtained.teams[1].users[1].id, gameObtained.teams[1].id);
                                                        }}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>
                                                }                                             
                                            </div>
                                                : userRole ? <UsersSelectGame typeGame={gameObtained.typeGame} teamId={gameObtained.teams[1].id} users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> :
                                                    <FormattedMessage id="project.global.field.empty"/>
                                            }
                                        </td>   
                                    </tr>
                                </tbody>
                        </table>

                        :
                        <div className="container">
                            {showAddButton && <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors} typeGame={gameObtained.typeGame}/>}
                            <div className="d-flex col-md-12">
                                <div className="mr-auto p-2 col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <div className="card-text">
                                                {gameObtained.users[0] ? 
                                                <div className="d-flex justify-content-center">
                                                    <UserLink className="p-2" id={gameObtained.users[0].id} user={gameObtained.users[0]}/>
                                                    {(userRole  || gameObtained.users[0].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => handleDelete(e, gameObtained.users[0].id)}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>} 
                                                </div>
                                                : userRole ? <UsersSelectGame typeGame={gameObtained.typeGame} users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> :
                                                    <FormattedMessage id="project.global.field.empty"/>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 col-md-6">
                                    <div className="card bg-light mb-6">
                                        <div className="card-body">
                                            <div className="card-text">
                                                {gameObtained.users[1] ? 
                                                <div className="d-flex justify-content-center">
                                                    <UserLink className="p-2" id={gameObtained.users[1].id} user={gameObtained.users[1]}/>
                                                    {(userRole  || gameObtained.users[1].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => handleDelete(e, gameObtained.users[1].id)}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>}
                                                </div>
                                            
                                            : userRole ? <UsersSelectGame typeGame={gameObtained.typeGame} users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> :
                                                    <FormattedMessage id="project.global.field.empty"/>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="mr-auto p-2 col-md-6">
                                    <div className="card bg-light mb-6">
                                        <div className="card-body">
                                            <div className="card-text">
                                                {gameObtained.users[2] ? 
                                                <div className="d-flex justify-content-center">
                                                    <UserLink className="p-2" id={gameObtained.users[2].id} user={gameObtained.users[2]}/>
                                                    {(userRole  || gameObtained.users[2].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => handleDelete(e, gameObtained.users[2].id)}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>}
                                                </div>
                                                : userRole ? <UsersSelectGame typeGame={gameObtained.typeGame} users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> :
                                                <FormattedMessage id="project.global.field.empty"/>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 col-md-6">
                                    <div className="card bg-light mb-6">
                                        <div className="card-body">
                                            <div className="card-text">
                                                {gameObtained.users[3] ? 
                                                <div className="d-flex justify-content-center">
                                                    <UserLink className="col-md-3 p-2" id={gameObtained.users[3].id} user={gameObtained.users[3]}/>
                                                    {(userRole  || gameObtained.users[3].id === user.id) &&
                                                    <form className="col-md-3 p-2" onSubmit={e => handleDelete(e, gameObtained.users[3].id)}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>}
                                                </div>
                                                : userRole ? <UsersSelectGame typeGame={gameObtained.typeGame} users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> :
                                                    <FormattedMessage id="project.global.field.empty"/>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
            </div>
            {userRole ? <Modal show={showModal} onHide={() => setShowModal(false)}>
                <form ref={node => form = node}
                                    className="needs-validation" noValidate 
                                    onSubmit={e => handleUpdate(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title><FormattedMessage id="project.scheduleList.addSchedule"/></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="card-body">
                        <div className="form-group row">
                            <label htmlFor="minimunLevel" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.global.fields.minimunLevel"/>
                            </label>
                            <div className="col-md-6">
                                <input type="number" id="minimunLevel" className="form-control"
                                    defaultValue={gameObtained.minimunLevel}
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
                                    defaultValue={gameObtained.maximunLevel}
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
                                    defaultValue={new Date(gameObtained.millisInitDate).toISOString().substr(0, 10)}
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
                                    defaultValue={obtainStringFromHour(initDateObtained)}
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
                                    defaultValue={obtainStringFromHour(finalDateObtained)}
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
                            <select defaultValue={gameObtained.fieldId} onChange={e => onChangeSelectField(e.target.value)}>
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
                </Modal.Body>
                <Modal.Footer>
                    <div className="form-group row">
                        <div className="offset-md-6 col-md-2">
                            <button type="submit" className="btn btn-primary">
                                <FormattedMessage id="project.games.addGame.title"/>
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </form>
        </Modal> : undefined}
       </div>
    );

}

export default GameDetails;