import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const UserLink = ({id, user}) => {

    const obtainFullName = (name, lastName1, lastName2) => {
        var fullName = name;
        if(lastName1){
            fullName = fullName + " " + lastName1;
        }
        if(lastName2){
            fullName = fullName + " " + lastName2;
        }
        return fullName;
    }
    return (
        <div className="d-flex">
            <div className="mr-auto p-2">
                <Link to={`/users/user-details/${id}`}>
                    <h4>{obtainFullName(user.name, user.lastName1, user.lastName2)}</h4>
                </Link>
                <FormattedMessage id="project.global.fields.level"/>: {user.level}
                <div>
                    <FormattedMessage id="project.global.fields.position"/>: {user.position}
                </div>
            </div>
            
        </div>
    );

}

UserLink.propTypes = {
    id: PropTypes.number.isRequired
};

export default UserLink; 