import React from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { FieldArray, Field } from 'redux-form'
import renderInput from '../../../../../../components/Fields/input'
import StaticBlockWrapperHOC from '../../../../../../components/DraggableHOC/'
import DraggableContainerWrapperHOC from '../../../../../../components/DraggableHOC/components/DraggableElement'
import Answer from '../AnswerQualitySurvey/'

const Question = ({ fields, field, index, types }) => (
    <li key={index} className="question-row">
        <h5>Question {index + 1}</h5>
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
        <FieldArray name={`${field}.answers`} noneButton parentId={index} dragSource="ANSWER" dropTarget="ANSWER" component={Answer} />
    </li>
)

export default StaticBlockWrapperHOC(DraggableContainerWrapperHOC(Question));