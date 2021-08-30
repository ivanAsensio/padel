import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from '../../common';
import { Users } from '..';

const UserListResult = () => {

    const users = useSelector(selectors.getAllUsers);
    const dispatch = useDispatch();
    const [login, setLogin] = useState("");
    const [minLevel, setMinLevel] = useState("");
    const [maxLevel, setMaxLevel] = useState("");
    let form;

    const handleSubmit = event => {

        event.preventDefault();
        if (form.checkValidity()) {
            dispatch(actions.getAllUsers(
                {page: 0, login: login, minLevel: Number(minLevel), maxLevel: Number(maxLevel)}
            ));
            
        }

    }

    if (!users) {
        return null;
    }

    if (users.users.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.users.getUsersResult.noUsers'/>
            </div>
        );
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
                                <label htmlFor="minLevel" className="col-form-label">
                                    <FormattedMessage id="project.global.fields.minimunLevel"/>
                                </label>
                                <input type="number" id="minLevel" className="form-control"
                                    value={minLevel}
                                    onChange={e => setMinLevel(e.target.value)}
                                    autoFocus/>
                            </div>
                            <div className="form-group p-2">
                                <label htmlFor="maxLevel" className="col-form-label">
                                    <FormattedMessage id="project.global.fields.maximunLevel"/>
                                </label>
                                <input type="text" id="maxLevel" className="form-control"
                                    value={maxLevel}
                                    onChange={e => setMaxLevel(e.target.value)}
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
            <Users users={users.users.items}/>
            <Pager 
                back={{
                    enabled: users.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousGetUsersResultPage(users.criteria))}}
                next={{
                    enabled: users.users.existMoreItems,
                    onClick: () => dispatch(actions.nextGetUsersResultPage(users.criteria))}}/>
        </div>

    );

}

export default UserListResult;