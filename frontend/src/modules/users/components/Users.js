import React from 'react';
import propTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {UserLink} from '../../common';


const Users = ({users}) => (

    users != null ? 

    <table className="table table-striped table-hover">

        <thead>
            <tr>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.userName'/>
                </th>
            </tr>
        </thead>

        <tbody>
            {users.map(user => 
                <tr key={user.id}>
                    <td><UserLink id={user.id} user={user}/></td>
                </tr>
            )}
        </tbody>

    </table>
    : 
    <table className="table table-striped table-hover"></table>
);

Users.propTypes = {
    users: propTypes.array
}

export default Users;