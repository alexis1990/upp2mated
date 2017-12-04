import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Form, Field, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Section from './components/SectionQualitySurvey/'
import renderInput from '../../../../../../components/Fields/input'
import Select from '../../../../../../components/Fields/select'
import { getQualitySurveyForm, sendQualitySurvey, sendEditingQualitySurvey, publishQualitySurvey } from '../../actions'
import './styles/style.css'

const required = value => value ? undefined : ' '

class ManageQualitySurvey extends Component {
    componentWillMount() {
        const { getQualitySurveyForm, match } = this.props;
        const surveyParams = {
            version: match.params.version,
            id: match.params.id
        }
        if (!!surveyParams.id) {
            getQualitySurveyForm(surveyParams);
        }
    }

    sendQualitySurvey(survey) {
        const { sendQualitySurvey, match } = this.props;
        const surveyId = match.params.id;

        if (!!surveyId) {
            sendEditingQualitySurvey(survey, surveyId);
        } else {
            sendQualitySurvey(survey);
        }
    }

    publishTemplate(templateId) {
        console.log('templateId', templateId)
        const { publishQualitySurvey } = this.props;
        publishQualitySurvey(templateId);
    }

    render() {
        const { version, editedVersion, publishedVersion, templateId, handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(this.sendQualitySurvey.bind(this))}>
                    <Col lg={4}>
                        <h3>Questionnaire Qualité :</h3>
                        <Field name="name" label="nom" component={renderInput} validate={[required]} />
                        <Field name="description" label="description" component={renderInput} validate={[required]} />
                        <div>Version : {version}</div>
                        <div>Statut : {publishedVersion ? "Publié" : "Non Publié"}</div>
                        <Row className="buttons-actions">
                            <Button disabled={publishedVersion === editedVersion} bsStyle="btn btn-action-button danger"onClick={() => this.publishTemplate(templateId)}>Publier</Button>
                            <Button type="submit" bsStyle="btn btn-action-button">Envoyer</Button>
                        </Row>
                        {/* <Field name="validTime" options={[]} label="Durée de Validité" component={Select} validate={[required]} /> */}
                    </Col>
                    <Col lg={8} className="form-creation">
                        <FieldArray name="sections" component={Section} dragSource="SECTION" dropTarget="SECTION" />
                    </Col>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state.form.Administration.qualitySurvey.values', state.form.Administration.qualitySurvey.values)
    return {
        templateId: state.form.Administration.qualitySurvey.values.id,
        editedVersion: state.form.Administration.qualitySurvey.values.editedVersion,
        version: state.form.Administration.qualitySurvey.values.version,
        publishedVersion: state.form.Administration.qualitySurvey.values.publishedVersion
    }
}

function mapDispatchToProps(state) {
    return (dispatch) => bindActionCreators({
        getQualitySurveyForm,
        sendQualitySurvey,
        sendEditingQualitySurvey,
        publishQualitySurvey
    }, dispatch)
}

ManageQualitySurvey = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageQualitySurvey);

export default reduxForm({
    form: 'Administration.qualitySurvey',
    initialValues: {
        changeList: [],
        sections: [],
        questions: []
    },
})(ManageQualitySurvey)