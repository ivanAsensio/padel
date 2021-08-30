import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const UserLink = ({id, login, level}) => {

    return (
        <div className="d-flex">
            <Link className="p-2" to={`/users/user-details/${id}`}>
                <h4>{login}</h4>
            </Link>
            <div className="ml-auto p-2">
                <h4>{level}</h4>
            </div>
        </div>
    );

}

UserLink.propTypes = {
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired
};

export default UserLink; 