import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import {useHistory} from 'react-router-dom';


const Field = ({id, name, state}) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleUpdate = (event) => {
        event.preventDefault();

        dispatch(actions.getInfoField(id, name, state));
        history.push("updateField");
    }

    const handleDelete = (event) => {
        event.preventDefault();

        actions.deleteField(
            {fieldId: id},
            () => history.push("fieldList"));
    }

    const handleChangeState = (event) => {
        event.preventDefault();

        actions.changeState(
            {id: id,
            state: !state},
            () => history.push("fieldList"));
    }

    return (
        <div className="tab-content d-flex">
            <div className="mr-auto p-2">
                <div htmlFor="name" className="col-xs-6">
                    <label htmlFor="name" className="col-md-6 col-form-label">
                        <FormattedMessage id="project.global.fields.firstName"/>
                        :{name}
                    </label>
                </div>
                <div htmlFor="state" className="col-xs-6">
                    <label htmlFor="state" className="col-md-3 col-form-label">
                        <FormattedMessage id="project.global.fields.state"/>    
                        :{
                            state ? 
                                <FormattedMessage id="project.global.fields.state.true"/>  
                            :   <FormattedMessage id="project.global.fields.state.false"/>  
                        }                       
                    </label>
                    <form onSubmit={e => handleChangeState(e)}>
                        <button type="submit" className="btn btn-secondary">
                            <FormattedMessage id="project.global.buttons.changeState"/> 
                        </button>
                    </form>
                </div>
            </div>
            <div className="p-2">
                <form onSubmit={e => handleUpdate(e)}>
                    <button type="submit" className="btn btn-primary">
                        <FormattedMessage id="project.global.buttons.update"/> 
                    </button>
                </form>
                <form onSubmit={e => handleDelete(e)}>
                    <button type="submit" className="btn btn-danger">
                        <FormattedMessage id="project.global.buttons.delete"/> 
                    </button>
                </form>
            </div>
        </div>
    );

}

Field.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired
};

export default Field; 