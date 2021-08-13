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
import users from '../../users';
import {Link} from 'react-router-dom';
import UsersSelectGame from './UsersSelectGame';
import {useHistory} from 'react-router-dom';


const GameDetails = () => {

    const gameObtained = useSelector(selectors.getGameObtained);
    const usersGameFiltered = useSelector(selectors.getUsersGameFiltered);
    const user = useSelector(users.selectors.getUser);
    const userRole = useSelector(users.selectors.getUserRole) === "ADMIN";
    const history = useHistory();
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    const {id} = useParams();
    const initDate = gameObtained ? new Date(gameObtained.millisInitDate) : null;
    const finalDate = gameObtained ? new Date(gameObtained.millisFinalDate) : null;
    const today = new Date();
    var userOnUserList = false;

    useEffect(() => {

        const gameId = Number(id);

        if (!Number.isNaN(gameId)) {
            dispatch(actions.findGameById(gameId));
        }

    }, [id, dispatch]);

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

    if (!gameObtained) {
        return null;
    }else{
        userOnUserList = gameObtained.users.filter((userObtained) => userObtained.id === user.id).length !== 0;
    }

    const showAddButton = (gameObtained && !userOnUserList) ? ((new Date(gameObtained.millisInitDate)) > today) : false
        
    return (
        <div>
            <BackLink></BackLink>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="container bootstrap snippet text-center bg-light">
                    <div className="d-flex">
                        <div className="col-md-10 p-2">
                            <div className="row">
                                <h1 htmlFor="date" className="col-sm-10">
                                    <FormattedDate value={initDate} key={initDate.getTime()}/>
                                    &nbsp;<FormattedTime value={initDate} />
                                    - <FormattedDate value={finalDate} key={finalDate.getTime()}/>
                                    &nbsp;<FormattedTime value={finalDate} />
                                </h1>
                            </div>
                            <div className="row">
                                <h1 htmlFor="level" className="col-sm-10">
                                    <FormattedMessage id="project.global.fields.minimunLevel"/>
                                    :&nbsp;{gameObtained.minimunLevel} - {gameObtained.maximunLevel}
                                </h1>
                            </div>
                            <div className="row">
                                <h1 htmlFor="typeGame" className="col-sm-10">
                                    <FormattedMessage id="project.global.fields.typeGame"/>
                                    :&nbsp;{gameObtained.typeGame}
                                </h1>
                            </div>
                            {gameObtained.sets.length !== 0 &&
                            <div className="row text-center">
                                <h1 htmlFor="Sets" className="col-sm-10">
                                    {gameObtained.sets.map(set => <h3>{set.result}&nbsp;</h3>)}
                                </h1>
                            </div>    
                            }
                        </div>
                        {userRole &&
                        <div className="ml-auto p-2">
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
                                        <th scope="col">{gameObtained.teams[0].name}</th>
                                        <th scope="col">{gameObtained.teams[1].name}</th>
                                        
                                    </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>{gameObtained.teams[0].users[0] ?
                                            <div className="d-flex justify-content-center">
                                                <UserLink id={gameObtained.teams[0].users[0].id} login={gameObtained.teams[0].users[0].login} level={gameObtained.teams[0].users[0].level}/>
                                                {(userRole  || gameObtained.teams[0].users[0].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => {
                                                        handleDelete(e, gameObtained.teams[0].users[0].id);
                                                        handleDeleteFromTeam(e, gameObtained.teams[0].users[0].id, gameObtained.teams[0].id);
                                                    }}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>
                                                }
                                            </div> 
                                            : showAddButton ? (userRole ? <UsersSelectGame gameId={id} users={usersGameFiltered} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>
                                        }</td>
                                        <td>{gameObtained.teams[1].users[0] ? 
                                            <div className="d-flex justify-content-center">
                                                <UserLink id={gameObtained.teams[1].users[0].id} login={gameObtained.teams[1].users[0].login} level={gameObtained.teams[1].users[0].level}/>
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
                                            : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>}
                                        </td>   
                                    </tr>
                                    <tr>
                                        <td>{gameObtained.teams[0].users[1] ? 
                                        <div className="d-flex justify-content-center">
                                            <UserLink id={gameObtained.teams[0].users[1].id} login={gameObtained.teams[0].users[1].login} level={gameObtained.teams[0].users[1].level}/>
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
                                            : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>}
                                        </td>
                                        <td>{
                                            gameObtained.teams[1].users[1] ? 
                                            <div className="d-flex justify-content-center">
                                                <UserLink id={gameObtained.teams[1].users[1].id} login={gameObtained.teams[1].users[1].login} level={gameObtained.teams[1].users[1].level}/> 
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
                                                : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>
                                            }
                                        </td>   
                                    </tr>
                                </tbody>
                        </table>

                        :
                        <div className="container">
                            <div className="d-flex">
                                <div className="mr-auto p-2 w-25">
                                    <div className="card bg-light mb-6">
                                        <div className="card-body">
                                            <p className="card-text">
                                                {gameObtained.users[0] ? 
                                                <div className="d-flex justify-content-center">
                                                    <UserLink id={gameObtained.users[0].id} login={gameObtained.users[0].login} level={gameObtained.users[0].level}/>
                                                    {(userRole  || gameObtained.users[0].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => handleDelete(e, gameObtained.users[0].id)}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>}
                                                </div>
                                                : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>): <FormattedMessage id="project.global.field.empty"/>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-25">
                                    <div className="card bg-light mb-6">
                                        <div className="card-body">
                                            <p className="card-text">
                                                {gameObtained.users[1] ? 
                                                <div className="d-flex justify-content-center">
                                                    <UserLink id={gameObtained.users[1].id} login={gameObtained.users[1].login} level={gameObtained.users[1].level}/>
                                                    {(userRole  || gameObtained.users[1].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => handleDelete(e, gameObtained.users[1].id)}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>}
                                                </div>
                                            
                                            : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>): <FormattedMessage id="project.global.field.empty"/>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="mr-auto p-2 w-25">
                                    <div className="card bg-light mb-6">
                                        <div className="card-body">
                                            <p className="card-text">
                                                {gameObtained.users[2] ? 
                                                <div className="d-flex justify-content-center">
                                                    <UserLink id={gameObtained.users[2].id} login={gameObtained.users[2].login} level={gameObtained.users[2].level}/>
                                                    {(userRole  || gameObtained.users[2].id === user.id) &&
                                                    <form className="p-2" onSubmit={e => handleDelete(e, gameObtained.users[2].id)}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>}
                                                </div>
                                                : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-25">
                                    <div className="card bg-light mb-6">
                                        <div className="card-body">
                                            <p className="card-text">
                                                {gameObtained.users[3] ? 
                                                <div className="d-flex justify-content-center">
                                                    <UserLink className="col-md-3" id={gameObtained.users[3].id} login={gameObtained.users[3].login} level={gameObtained.users[3].level}/>
                                                    {(userRole  || gameObtained.users[3].id === user.id) &&
                                                    <form className="col-md-3 p-2" onSubmit={e => handleDelete(e, gameObtained.users[3].id)}>
                                                        <button type="submit" className="btn btn-danger">
                                                            <FormattedMessage id="project.global.buttons.delete"/> 
                                                        </button>
                                                    </form>}
                                                </div>
                                                : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>): <FormattedMessage id="project.global.field.empty"/>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
            </div>
       </div>
    );

}

export default GameDetails;