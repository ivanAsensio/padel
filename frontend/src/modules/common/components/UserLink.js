import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const UserLink = ({id, login}) => {

    return (
        <Link to={`/users/user-details/${id}`}>
            {login}
        </Link>
    );

}

UserLink.propTypes = {
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired
};

export default UserLink; 