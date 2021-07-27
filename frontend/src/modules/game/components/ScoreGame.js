import React from 'react';
import * as actions from '../actions';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import * as selectors from '../selectors';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';


const ScoreGame = () => {

    const history = useHistory();
    const game = useSelector(selectors.getGameObtained);
    const sets = useSelector(selectors.getSets);
    const [numberSet, setNumberSet] = useState(1);
    const [firstResult, setFirstResult] = useState(null);
    const [secondResult, setSecondResult] = useState(null);
    let form;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const set = {
                numberSet: numberSet,
                result: firstResult + "-" + secondResult
            }
            sets.push(set);
            actions.addSet(sets);
            setNumberSet(numberSet + 1);          
        }
    }

    const handleAddResult = (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            actions.addSetList(sets, game.gameId, () => history.push(`/games/game-details/${game.gameId}`));     
        } 
    }

    if(!game.sets)
        return null;

    return (
        <div className="d-flex">
            <div className="p-2">
                <div className="card-body">
                    <form ref={node => form = node}
                        className="needs-validation" noValidate 
                        onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="firstResult" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.global.fields.firstResult"/>
                            </label>
                            <div className="col-md-6">
                                <input type="number" id="firstResult" className="form-control"
                                    value={firstResult}
                                    onChange={e => setFirstResult(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="secondResult" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.global.fields.secondResult"/>
                            </label>
                            <div className="col-md-6">
                                <input type="number" id="secondResult" className="form-control"
                                    value={secondResult}
                                    onChange={e => setSecondResult(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-6 col-md-4">
                                <button type="button" onClick={handleSubmit} className="btn btn-primary">
                                    <FormattedMessage id="project.games.scoreGame.addSet.title"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="ml-auto p-2">
                {
                sets.length !== 0 ? 

                <table className="table table-striped table-hover">

                    <thead>
                        <tr>
                            <th scope="col">
                                <div>
                                    <FormattedMessage id='project.global.fields.numberSet'/>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <FormattedMessage id="project.global.fields.firstResult"/>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <FormattedMessage id="project.global.fields.secondResult"/>
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {sets.map(set => 
                            <tr key={set.numberSet}>
                                <td className="text-center">{set.numberSet}</td>
                                <td className="text-center">{set.result.split('-')[0]}</td>
                                <td className="text-center">{set.result.split('-')[1]}</td>
                            </tr>
                        )}
                    </tbody>

                </table>
                : 
                <table className="table table-striped table-hover"></table>
                }
            </div>
            <form ref={node => form = node}
                        className="needs-validation" noValidate 
                        onSubmit={e => handleAddResult(e)}>
                <div className="form-group row">
                    <div className="offset-md-6 col-md-4">
                        <button type="submit" onClick={handleAddResult} className="btn btn-primary">
                            <FormattedMessage id="project.global.fields.addScore"></FormattedMessage>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ScoreGame;