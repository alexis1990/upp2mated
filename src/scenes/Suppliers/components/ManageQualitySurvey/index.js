import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Form, Field, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Section from './components/SectionQualitySurvey/'
import renderInput from '../../../../components/Fields/input'
import Select from '../../../../components/Fields/select'
import './styles/style.css'

const required = value => value ? undefined : ' '

class ManageQualitySurvey extends Component {
    componentWillMount() {
        const { match } = this.props;
    }

    sendQualitySurvey(survey) {
        const {  match } = this.props;
        const surveyId = match.params.id;

        if (!!surveyId) {
        } else {
        }
    }

    render() {
        const { handleSubmit, lastEditingVersionBySupplier, templatePublishedVersion, pristine, reset, submitting } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit(this.sendQualitySurvey.bind(this))}>
                    <Col lg={4}>
                        <h3>Questionnaire Qualité :</h3>
                        <Field name="name" label="nom" component={renderInput} validate={[required]} />
                        <Field name="description" label="description" component={renderInput} validate={[required]} />
                        <div>Version d'édition : {lastEditingVersionBySupplier}</div>
                        <div>Version de Publication : {templatePublishedVersion}</div>
                        {/* <Field name="validTime" options={[]} label="Durée de Validité" component={Select} validate={[required]} /> */}
                    </Col>
                    <Col lg={8} className="form-creation">
                        <FieldArray name="content" noneButton component={Section} dragSource="SECTION" dropTarget="SECTION" />
                    </Col>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lastEditingVersionBySupplier: state.form.Suppliers.qualitySurvey.values.lastEditingVersionBySupplier,
        templatePublishedVersion: state.form.Suppliers.qualitySurvey.values.templatePublishedVersion
    }
}

function mapDispatchToProps(state) {
    return (dispatch) => bindActionCreators({
    }, dispatch)
}

ManageQualitySurvey = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageQualitySurvey);

export default reduxForm({
    form: 'Suppliers.qualitySurvey'
})(ManageQualitySurvey)