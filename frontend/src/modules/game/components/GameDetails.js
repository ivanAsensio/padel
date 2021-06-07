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


const GameDetails = () => {

    const gameObtained = useSelector(selectors.getGameObtained);
    const user = useSelector(users.selectors.getUser);
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    const {id} = useParams();
    const initDate = gameObtained ? new Date(gameObtained.millisInitDate) : null;
    const finalDate = gameObtained ? new Date(gameObtained.millisFinalDate) : null;

    useEffect(() => {

        const gameId = Number(id);

        if (!Number.isNaN(gameId)) {
            dispatch(actions.findGameById(gameId));
        }

    }, [id, dispatch]);

    if (!gameObtained) {
        return null;
    }
        
    return (
        <div>
            <BackLink></BackLink>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="container bootstrap snippet ">
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
                                    : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>
                                }</td>
                                <td>{gameObtained.teams[1].users[0] ? <UserLink id={gameObtained.teams[1].users[0].id} login={gameObtained.teams[1].users[0].login}/>
                                    : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>}
                                </td>   
                            </tr>
                            <tr>
                                <td>{gameObtained.teams[0].users[1] ? <UserLink id={gameObtained.teams[0].users[1].id} login={gameObtained.teams[0].users[1].login}/>
                                    : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>}
                                </td>
                                <td>{
                                    gameObtained.teams[1].users[1] ? <UserLink id={gameObtained.teams[1].users[1].id} login={gameObtained.teams[1].users[1].login}/> 
                                        : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>
                                    }
                                </td>   
                            </tr>
                        </tbody>
                   </table>

                :
                <div className="container">
                    <div class="d-flex">
                        <div class="mr-auto p-2">
                            <div class="card bg-light mb-3">
                                <div class="card-body">
                                    <p class="card-text">
                                        {gameObtained.users[0] ? <UserLink id={gameObtained.users[0].id} login={gameObtained.users[0].login}/>
                                        : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="p-2">
                            <div class="card bg-light mb-3">
                                <div class="card-body">
                                    <p class="card-text">
                                        {gameObtained.users[1] ? <UserLink id={gameObtained.users[1].id} login={gameObtained.users[0].login}/>
                                    : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="mr-auto p-2">
                            <div class="card bg-light mb-3">
                                <div class="card-body">
                                    <p class="card-text">
                                        {gameObtained.users[2] ? <UserLink id={gameObtained.users[2].id} login={gameObtained.users[2].login}/>
                                        : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="p-2">
                            <div class="card bg-light mb-3">
                                <div class="card-body">
                                    <p class="card-text">
                                        {gameObtained.users[3] ? <UserLink id={gameObtained.users[3].id} login={gameObtained.users[3].login}/>
                                        : <BtnAddPlayer userId={user.id} gameId={id} setBackendErrors={setBackendErrors}/>}
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