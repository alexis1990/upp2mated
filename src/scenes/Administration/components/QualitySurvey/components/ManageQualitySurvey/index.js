import React, {Component} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {Field, FieldArray, Form, reduxForm} from 'redux-form'
import {withRouter} from 'react-router-dom'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Section from './components/SectionQualitySurvey/'
import renderInput from '../../../../../../components/Fields/input'

import {getQualitySurveyForm, publishQualitySurvey, sendEditingQualitySurvey, sendQualitySurvey} from '../../actions'
import './styles/style.css'

const required = value => value ? undefined : ' '

class ManageQualitySurvey extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const {getQualitySurveyForm, match} = this.props;
    const surveyParams = {
      version: match.params.version,
      id: match.params.id
    }
    if (!!surveyParams.id) {
      getQualitySurveyForm(surveyParams);
    }

  }

  sendQualitySurvey(survey) {
    const {sendQualitySurvey, sendEditingQualitySurvey, match, history} = this.props;
    const surveyId = match.params.id;

    if (!!surveyId) {
      sendEditingQualitySurvey(survey, surveyId, history);
    } else {
      sendQualitySurvey(survey, history);
    }
  }

  publishTemplate(templateId) {
    const {publishQualitySurvey, history} = this.props;
    publishQualitySurvey(templateId, history);
  }

  render() {
    const {name, description, editedVersion, publishedVersion, templateId, handleSubmit, pristine, reset, submitting, match} = this.props;

    return (
      <div>
        <Form onSubmit={handleSubmit(this.sendQualitySurvey.bind(this))}>
          <Col lg={4}>
            <h2>Questionnaire Qualité :</h2>
            <h3>{name}</h3>
            <p>{description}</p>
            <div>Version modifiée : {editedVersion}</div>
            <div>Dernière version publiée : {publishedVersion ? "Aucune" : publishedVersion}</div>
            <Row className="buttons-actions">
              <Col lg={6}>
                <Button type="button" bsStyle="btn btn-action-button" onClick={() => this.publishTemplate(templateId)}>Publier</Button>
              </Col>
              <Col lg={6}>
                <Button type="submit" bsStyle="btn btn-action-button">Sauvegarder cette version</Button>
              </Col>
            </Row>
          </Col>
          <Col lg={8} className="form-creation">
            <FieldArray name="sections" component={Section} dragSource="SECTION" dropTarget="SECTION"/>
          </Col>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    templateId: state.form.Administration.qualitySurvey.values.id,
    editedVersion: state.form.Administration.qualitySurvey.values.editedVersion,
    publishedVersion: state.form.Administration.qualitySurvey.values.publishedVersion,
    name: state.form.Administration.qualitySurvey.values.name,
    description: state.form.Administration.qualitySurvey.values.description
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
    lastChangeSet: {
      changeList: []
    },
    sections: [],
    questions: []
  },
})(withRouter(ManageQualitySurvey))