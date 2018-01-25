import React from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { FieldArray, Field } from 'redux-form'
import renderInput from '../../../../../../components/Fields/input'
import StaticBlockWrapperHOC from '../../../../../../components/DraggableHOC/'
import DraggableContainerWrapperHOC from '../../../../../../components/DraggableHOC/components/DraggableElement'
import { required } from '../../../../../../utils/inputRules.js'

const Answer = ({ fields, field, index, types }) => (
    <li key={index} className="answer-row">
        <h5>Réponse {index + 1}</h5>
        <div className="answer-field">
            <Field
                name={`${field}.content`}
                type="text"
                component={renderInput}
                label={`Answer #${index + 1}`}
                validate={[ required ]}
            />
        </div>
        {/* <div className="add-answer-button">
            <Button
                type="button"
                bsStyle="btn btn-action-button font-icon"
                onClick={() => fields.remove(index)}
            >
                <Glyphicon glyph="remove" />
            </Button>
        </div> */}
    </li>
)

export default StaticBlockWrapperHOC(DraggableContainerWrapperHOC(Answer));