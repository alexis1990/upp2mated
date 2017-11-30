import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Form, Field, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import renderSections from '../../../../../../components/BasicSurvey'
import renderInput from '../../../../../../components/Fields/input'
import Select from '../../../../../../components/Fields/select'
import { getQualitySurveyForm, sendQualitySurvey, sendEditingQualitySurvey } from '../../actions'
import '../../styles/style.css'

const required = value => value ? undefined : ' '

class ManageQualitySurvey extends Component {
    componentWillMount(){
        const { getQualitySurveyForm, match } = this.props;
        const surveyParams = {
            version: match.params.version,
            id: match.params.id
        }
        if(!!surveyParams.id) {
            getQualitySurveyForm(surveyParams);
        }
    }

    sendQualitySurvey(survey) {
        const { sendQualitySurvey, match } = this.props;
        const surveyId = match.params.id;

        if(!!surveyId) {
            sendEditingQualitySurvey(survey, surveyId);
        } else {
            sendQualitySurvey(survey);
        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(this.sendQualitySurvey.bind(this))}>
                    <Col lg={4}>
                        <h3>Questionnaire Qualité :</h3>
                        <Field name="name" label="nom" component={renderInput} validate={[required]} />
                        <Field name="description" label="description" component={renderInput} validate={[required]} />
                        <div>Version : v1</div>
                        <div>Statut : Publié</div>
                        <Field name="validTime" options={[]} label="Durée de Validité" component={Select} validate={[required]} />
                    </Col>
                    <Col lg={8} className="form-creation">
                        <FieldArray name="sections" component={renderSections} />
                    </Col>
                    <Col lg={12} className="align-right">
                        <Button type="submit" bsStyle="btn btn-action-button">Envoyer</Button>
                    </Col>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(state) {
    return (dispatch) => bindActionCreators({ 
        getQualitySurveyForm, 
        sendQualitySurvey,
        sendEditingQualitySurvey
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
    }
})(ManageQualitySurvey)