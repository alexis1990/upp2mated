import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'

import renderInput from '../Fields/input'

const renderSections = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
        <li className="add-section-row">
            <Button type="button" bsStyle="btn btn-action-button" onClick={() => fields.push({})}>
                Nouvelle Section
            </Button>
            {submitFailed && error && <span>{error}</span>}
        </li >
        {
            fields.map((section, index) => (
                <li key={index} className="sections" >
                    <div className="trash-row">
                        <Button
                            type="button"
                            bsStyle="btn btn-action-button font-icon"
                            onClick={() => fields.remove(index)}
                        >
                            <Glyphicon glyph="remove" />
                        </Button>
                    </div>
                    <Col lg={12}>
                        <Col lg={3}>
                            <h4>Section {index + 1}</h4>
                        </Col>
                        <Col lg={4}>
                            <Field
                                name={`${section}.content`}
                                type="text"
                                withoutLabel
                                component={renderInput}
                                placeholder="Nom"
                            />
                        </Col>
                    </Col>
                    <FieldArray name={`${section}.questions`} component={renderQuestions} />
                </li>
            ))
        }
    </ul >
)

const renderQuestions = ({ fields, meta: { error } }) => (
    <ul>
        <li className="add-question-row">
            <Button bsStyle="btn btn-action-button" type="button" onClick={() => fields.push()}>
                Ajouter une question
            </Button>
        </li>
        {fields.map((hobby, index) => (
            <Row key={index} className="question-row">
                <Col lg={10}>
                    <Field
                        name={`${hobby}.content`}
                        type="text"
                        component={renderInput}
                        label={`Question #${index + 1}`}
                    />
                </Col>
                <Col lg={2} className="add-question-button">
                    <Button
                        type="button"
                        bsStyle="btn btn-action-button font-icon"
                        onClick={() => fields.remove(index)}
                    >
                        <Glyphicon glyph="remove" />
                    </Button>
                </Col>
            </Row>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
)

export default renderSections;