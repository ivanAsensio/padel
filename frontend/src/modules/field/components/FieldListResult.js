import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

import * as selectors from '../selectors';
import Field from './Field';

const FieldListResult = () => {

    const fields = useSelector(selectors.getAllFields);

    if (!fields) {
        return null;
    }

    if (fields.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.fields.getFieldsResult.noField'/>
            </div>
        );
    }

    return (

        fields != null ? 

        <table className="table table-striped table-hover">
    
            <thead>
                <tr>
                    <th scope="col" className="d-flex">
                        <div className="mr-auto p-2">
                            <FormattedMessage id='project.global.fields.fieldName'/>
                        </div>
                        <div className="p-2">
                            <Link to="/fields/addField">
                                <FormattedMessage id="project.fields.addField.title"/>
                            </Link>
                        </div>
                    </th>
                </tr>
            </thead>
    
            <tbody>
                {fields.map(field => 
                    <tr key={field.fieldId}>
                        <td><Field id={field.fieldId} name={field.name} state={field.state}/></td>
                    </tr>
                )}
            </tbody>
    
        </table>
        : 
        <table className="table table-striped table-hover"></table>

    );

}

export default FieldListResult;