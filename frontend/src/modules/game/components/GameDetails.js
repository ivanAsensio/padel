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


const GameDetails = () => {

    const gameObtained = useSelector(selectors.getGameObtained);
    const usersGameFiltered = useSelector(selectors.getUsersGameFiltered);
    const user = useSelector(users.selectors.getUser);
    const userRole = useSelector(users.selectors.getUserRole) === "ADMIN";
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    const {id} = useParams();
    const initDate = gameObtained ? new Date(gameObtained.millisInitDate) : null;
    const finalDate = gameObtained ? new Date(gameObtained.millisFinalDate) : null;
    const today = new Date();
    const showAddButton = gameObtained ? ((new Date(gameObtained.millisInitDate)) > today) : false

    useEffect(() => {

        const gameId = Number(id);

        if (!Number.isNaN(gameId)) {
            dispatch(actions.findGameById(gameId));
        }

    }, [id, dispatch]);

    if (!gameObtained) {
        return null;
    }else{
        actions.findUsersByLevelAndDate(gameObtained.minimunLevel, gameObtained.maximunLevel, initDate.getDate());
    }
        
    return (
        <div>
            <BackLink></BackLink>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="container bootstrap snippet text-center">
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
                {gameObtained.sets.length !== 0 ?
                <div className="row text-center">
                    <h1 htmlFor="Sets" className="col-sm-10">
                        {gameObtained.sets.map(set => <h3>{set.result}&nbsp;</h3>)}
                    </h1>
                </div> : 
                gameObtained.typeGame === "Pro" &&
                <Link to={`/games/scoreGame`} className="me-auto">
                    <button type="submit" className="btn btn-primary">
                        <FormattedMessage id="project.global.fields.addScore"/> 
                    </button>
                </Link>
                }
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
                                    <UserLink id={gameObtained.teams[0].users[0].id} login={gameObtained.teams[0].users[0].login}/> 
                                    : showAddButton ? (userRole ? <UsersSelectGame gameId={id} users={usersGameFiltered} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>
                                }</td>
                                <td>{gameObtained.teams[1].users[0] ? <UserLink id={gameObtained.teams[1].users[0].id} login={gameObtained.teams[1].users[0].login}/>
                                    : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>}
                                </td>   
                            </tr>
                            <tr>
                                <td>{gameObtained.teams[0].users[1] ? <UserLink id={gameObtained.teams[0].users[1].id} login={gameObtained.teams[0].users[1].login}/>
                                    : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>}
                                </td>
                                <td>{
                                    gameObtained.teams[1].users[1] ? <UserLink id={gameObtained.teams[1].users[1].id} login={gameObtained.teams[1].users[1].login}/> 
                                        : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>
                                    }
                                </td>   
                            </tr>
                        </tbody>
                   </table>

                :
                <div className="container">
                    <div class="d-flex">
                        <div class="mr-auto p-2 w-25">
                            <div class="card bg-light mb-6">
                                <div class="card-body">
                                    <p class="card-text">
                                        {gameObtained.users[0] ? <UserLink id={gameObtained.users[0].id} login={gameObtained.users[0].login}/>
                                        : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>): <FormattedMessage id="project.global.field.empty"/>}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 w-25">
                            <div class="card bg-light mb-6">
                                <div class="card-body">
                                    <p class="card-text">
                                        {gameObtained.users[1] ? <UserLink id={gameObtained.users[1].id} login={gameObtained.users[0].login}/>
                                    : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>): <FormattedMessage id="project.global.field.empty"/>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="mr-auto p-2 w-25">
                            <div class="card bg-light mb-6">
                                <div class="card-body">
                                    <p class="card-text">
                                        {gameObtained.users[2] ? <UserLink id={gameObtained.users[2].id} login={gameObtained.users[2].login}/>
                                        : showAddButton ? (userRole ? <UsersSelectGame users={usersGameFiltered} gameId={id} setBackendErrors={setBackendErrors}/> : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>) : <FormattedMessage id="project.global.field.empty"/>}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 w-25">
                            <div class="card bg-light mb-6">
                                <div class="card-body">
                                    <p class="card-text">
                                        {gameObtained.users[3] ? <UserLink id={gameObtained.users[3].id} login={gameObtained.users[3].login}/>
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