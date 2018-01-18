import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Form, Field, reduxForm, FieldArray } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Section from './components/SectionQualitySurvey/'
import renderInput from '../../../../../../components/Fields/input'
import Select from '../../../../../../components/Fields/select'
import SelectSuppliersModal from './components/SelectSuppliersModal/'
import Modal from '../../../../../../components/Modal/'

import { isModalVisible } from '../../../../../../components/Modal/actions'
import { 
    getQualitySurveyForm, 
    sendQualitySurvey, 
    sendEditingQualitySurvey, 
    publishQualitySurvey, 
    sendQualitySurveyToSupplier 
} from '../../actions'
import './styles/style.css'

const required = value => value ? undefined : ' '

class ManageQualitySurvey extends Component {
    constructor() {
        super();

        this.openModalToSendQSToSupplier = this.openModalToSendQSToSupplier.bind(this);
    }
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
        const { sendQualitySurvey, match, history } = this.props;
        const surveyId = match.params.id;

        if (!!surveyId) {
            sendEditingQualitySurvey(survey, surveyId, history);
        } else {
            sendQualitySurvey(survey, history);
        }
    }

    publishTemplate(templateId) {
        const { publishQualitySurvey, history } = this.props;
        publishQualitySurvey(templateId, history);
    }

    openModalToSendQSToSupplier(templateId) {
        const { sendQualitySurveyToSupplier, isModalVisible } = this.props;
        isModalVisible(true)
    }

    render() {
        const { version, editedVersion, publishedVersion, templateId, handleSubmit, isVisible, pristine, reset, submitting, match } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit(this.sendQualitySurvey.bind(this))}>
                <Modal isVisible={isVisible} component={<SelectSuppliersModal />} />
                    <Col lg={4}>
                        <h3>Questionnaire Qualité :</h3>
                        <Field name="name" label="nom" component={renderInput} validate={[required]} />
                        <Field name="description" label="description" component={renderInput} validate={[required]} />
                        <div>Version modifiée : {editedVersion}</div>
                        <div>Version publiée : {publishedVersion}</div>
                        <div>Statut : {publishedVersion ? "Publié" : "Non Publié"}</div>
                        <Row className="buttons-actions">
                            <Col lg={6}>
                                <Button type="button" bsStyle="btn btn-action-button" onClick={() => this.publishTemplate(templateId)}>Publier</Button>
                            </Col>
                            <Col lg={6}>
                                <Button type="submit" bsStyle="btn btn-action-button">Envoyer</Button>
                            </Col>
                            <Col lg={12}>
                                <Button type="button" bsStyle="btn btn-action-button" onClick={() => this.openModalToSendQSToSupplier(templateId) }>Envoyer à un fournisseur</Button>
                            </Col>
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
    return {
        isVisible: state.modal.mode,
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
        publishQualitySurvey,
        sendQualitySurveyToSupplier,
        isModalVisible, 
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
})(withRouter(ManageQualitySurvey))