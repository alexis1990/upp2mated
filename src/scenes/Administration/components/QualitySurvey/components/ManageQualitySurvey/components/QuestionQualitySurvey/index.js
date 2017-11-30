import React from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { FieldArray, Field } from 'redux-form'
import renderInput from '../../../../../../../../components/Fields/input'
import StaticBlockWrapperHOC from '../../../../../../../../components/BasicSurvey/'
import DraggableContainerWrapperHOC from '../../../../../../../../components/BasicSurvey/components/DraggableElement'

const Question = ({ fields, field, index }) => (
    <li key={index} className="question-row" >
        <div className="question-field">
            <Field
                name={`${field}.content`}
                type="text"
                component={renderInput}
                label={`Question #${index + 1}`}
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