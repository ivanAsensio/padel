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
    };
    const style = {};
    style["min-width"] = "120px";
    return (
        <div className="d-flex">
            <div className="p-2 col-md-5">
                <img src={user && user.image ? user.image : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"} className="rounded-circle w-25" style={style} alt="avatar"></img>
            </div>
            <div className="p-2 col-7">
                <Link to={`/users/user-details/${id}`}>
                    <h4>{user.login}</h4>
                </Link>
                <label>{obtainFullName(user.name, user.lastName1, user.lastName2)}</label>
                <br></br>
                <label><FormattedMessage id="project.global.fields.level"/>: {user.level}</label>
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