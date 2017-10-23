import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import renderSections from '../../../../components/BasicSurvey'
import renderInput from '../../../../components/Fields/input'
import Select from '../../../../components/Fields/select'
import { getQualitySurveyForm } from './actions'
import './styles/style.css'

class QualitySurvey extends Component {
    componentWillMount(){
        this.props.getQualitySurveyForm();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <Col lg={6}>
                    <h3>Questionnaire Qualité :</h3>
                    <Field name="nom" label="nom" component={renderInput} />
                    <Field name="description" label="description" component={renderInput} />
                    <div>Version : v1</div>
                    <div>Statut : Publié</div>
                    <Field name="description" options={[]} label="Durée de Validité" component={Select} />
                </Col>
                <Col lg={6} className="form-creation">
                    <FieldArray name="sections" component={renderSections} />
                </Col>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('STATEEE', state)
    return {}
}

function mapDispatchToProps(state) {
    return (dispatch) => bindActionCreators({ getQualitySurveyForm }, dispatch)
}

QualitySurvey = connect(
    mapStateToProps,
    mapDispatchToProps
)(QualitySurvey);

export default reduxForm({
    form: 'Administration.qualitySurvey'
})(QualitySurvey)