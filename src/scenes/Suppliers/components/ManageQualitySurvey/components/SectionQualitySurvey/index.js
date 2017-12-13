import React from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { FieldArray, Field } from 'redux-form'
import renderInput from '../../../../../../components/Fields/input'
import StaticBlockWrapperHOC from '../../../../../../components/DraggableHOC/'
import DraggableContainerWrapperHOC from '../../../../../../components/DraggableHOC/components/DraggableElement'
import Question from '../QuestionQualitySurvey/'

const Section = ({ fields, field, index, addChangeSetModify, types }) => (
    <li key={index} className="sections">
        <Col lg={12}>
            <Col lg={3}>
                <h4>Section {index + 1}</h4>
            </Col>
            <Col lg={4}>
                <Field
                    name={`${field}.content`}
                    type="text"
                    withoutLabel
                    component={renderInput}
                    placeholder="Nom"
                    onChange={(input)=> addChangeSetModify(index, types)}
                />
            </Col>
        </Col>
        <FieldArray name={`${field}.questions`} noneButton parentId={index} dragSource="QUESTION" dropTarget="QUESTION" component={Question} />
    </li>
)

export default StaticBlockWrapperHOC(DraggableContainerWrapperHOC(Section));