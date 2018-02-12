import React from 'react';
import { Col, Button, Glyphicon } from 'react-bootstrap';
import { FieldArray, Field } from 'redux-form';
import renderInput from '../../../../../../../../components/Fields/input';
import StaticBlockWrapperHOC from '../../../../../../../../components/DraggableHOC/';
import DraggableContainerWrapperHOC from '../../../../../../../../components/DraggableHOC/components/DraggableElement';
import { required } from '../../../../../../../../utils/inputRules';

const Question = ({ fields, field, index, dragSource, addChangeSetModify, addChangeSetRemove }) => {
    const status = fields.getAll()[index].status || 'add';

    return (
        <li key={index} className={`question-row question-status-${status.toLowerCase()}`}>
            <div className="question-field">
                <Field
                    name={`${field}.content`}
                    type="text"
                    component={renderInput}
                    label={`Question #${index + 1}`}
                    onChange={(input) => addChangeSetModify(index, dragSource)}
                    validate={[required]}
                />
            </div>
            <div className="add-question-button">
                <Button
                    type="button"
                    bsStyle="btn btn-action-button font-icon"
                    onClick={() => {
                        fields.remove(index);
                        addChangeSetRemove(index, dragSource);
                    }
                    }
                >
                    <Glyphicon glyph="remove" />
                </Button>
            </div>
        </li>
    );
};

export default StaticBlockWrapperHOC(DraggableContainerWrapperHOC(Question));