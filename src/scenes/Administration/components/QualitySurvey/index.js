import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import renderSections from '../../../../components/BasicSurvey'
import renderInput from '../../../../components/Fields/input'
import Select from '../../../../components/Fields/select'
import { getQualitySurveys } from './actions'
import './styles/style.css'

class QualitySurveys extends Component {
    componentWillMount(){
        const { getQualitySurveys } = this.props;
        getQualitySurveys();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <Col lg={6}>
                    <h3>Questionnaires Qualitées :</h3>
                    <Button className="action-button">
                        <Link to={`/administration/quality-surveys/quality-survey/new`}>
                            <Glyphicon glyph="eye-plus" /> Créer un questionnaire
                        </Link>
                    </Button>
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
    return (dispatch) => bindActionCreators({ getQualitySurveys }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (QualitySurveys)