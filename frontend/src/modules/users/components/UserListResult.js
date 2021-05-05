import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from '../../common';
import { Users } from '..';

const UserListResult = () => {

    const users = useSelector(selectors.getAllUsers);
    const dispatch = useDispatch();

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
            <Users users={users.users.items}/>
            <Pager 
                back={{
                    enabled: users.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousGetUsersResultPage(users.criteria))}}
                next={{
                    enabled: users.users.items.existMoreItems,
                    onClick: () => dispatch(actions.nextGetUsersResultPage(users.criteria))}}/>
        </div>

    );

}

export default UserListResult;