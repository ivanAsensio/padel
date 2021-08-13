import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const UserLink = ({id, login, level}) => {

    return (
        <Link to={`/users/user-details/${id}`}>
            <h4>{login}</h4>
            <h4>{level}</h4>
        </Link>
    );

}

UserLink.propTypes = {
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired
};

export default UserLink; 