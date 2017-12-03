import React from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { FieldArray, Field } from 'redux-form'
import renderInput from '../../../../../../../../components/Fields/input'
import StaticBlockWrapperHOC from '../../../../../../../../components/DraggableHOC/'
import DraggableContainerWrapperHOC from '../../../../../../../../components/DraggableHOC/components/DraggableElement'

const Question = ({ fields, field, index, types, addChangeSetModify }) => (
    <li key={index} className="question-row">
        <div className="question-field">
            <Field
                name={`${field}.content`}
                type="text"
                component={renderInput}
                label={`Question #${index + 1}`}
                onChange={(input)=> addChangeSetModify(index, types)}
            />
        </div>
        <div className="add-question-button">
            <Button
                type="button"
                bsStyle="btn btn-action-button font-icon"
                onClick={() => fields.remove(index)}
            >
                <Glyphicon glyph="remove" />
            </Button>
        </div>
    </li>
)

export default StaticBlockWrapperHOC(DraggableContainerWrapperHOC(Question));