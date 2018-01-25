import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Form, Field, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Section from './components/SectionQualitySurvey/'
import renderInput from '../../../../components/Fields/input'
import Select from '../../../../components/Fields/select'
import { sendReply } from '../../actions'
import './styles/style.css'

const required = value => value ? undefined : ' '

class ManageQualitySurvey extends Component {
    componentWillMount() {
        const { match } = this.props;
    }

    sendQualitySurveyReply(survey) {
        const { sendReply, match } = this.props;

        const templateId = match.params.templateId;
        const supplierId = match.params.supplierId;
        sendReply(survey, templateId, supplierId);
    }

    render() {
        const { handleSubmit, lastEditingVersionBySupplier, templatePublishedVersion, pristine, reset, submitting } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit(this.sendQualitySurveyReply.bind(this))}>
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
                    <Col lg={12} className="align-right">
                        <Button bsStyle="btn btn-action-button" type="submit">Envoyer</Button>
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
        sendReply
    }, dispatch)
}

ManageQualitySurvey = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageQualitySurvey);

export default reduxForm({
    form: 'Suppliers.qualitySurvey'
})(withRouter(ManageQualitySurvey))