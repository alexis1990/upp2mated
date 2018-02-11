import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FieldArray, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Section from './components/SectionQualitySurvey/';

import { getQualitySurveyForm, publishQualitySurvey, sendEditingQualitySurvey, sendQualitySurvey } from '../../actions';
import './styles/style.css';

const required = value => (value ? undefined : ' ');

class ManageQualitySurvey extends Component {
  componentWillMount() {
    const { getQualitySurveyForm, match } = this.props;
    const surveyParams = {
      version: match.params.version,
      id: match.params.id,
    };

    if (surveyParams.id) {
      getQualitySurveyForm(surveyParams);
    }
  }

  sendQualitySurvey(survey) {
    const { sendQualitySurvey, sendEditingQualitySurvey, match, history } = this.props;
    const surveyTemplateId = match.params.id;

    if (surveyTemplateId) {
      sendEditingQualitySurvey(survey, surveyTemplateId, history);
    } else {
      sendQualitySurvey(survey, history);
    }
  }

  publishTemplate(templateId) {
    const { publishQualitySurvey, history } = this.props;
    publishQualitySurvey(templateId, history);
  }

  render() {
    const { id, name, description, editedVersion, publishedVersion } = this.props.surveyTemplateDetails;
    const { handleSubmit } = this.props;

    return (
      <div>
        <Form onSubmit={handleSubmit(this.sendQualitySurvey.bind(this))}>
          <Col lg={4}>
            <h2>Questionnaire Qualité :</h2>
            <h3>{name}</h3>
            <p>{description}</p>
            <div>Version modifiée : {editedVersion}</div>
            <div>Dernière version publiée : {publishedVersion || 'Aucune'}</div>
            <Row className="buttons-actions">
              <Col lg={6}>
                <Button type="button" bsStyle="btn btn-action-button" onClick={() => this.publishTemplate(id)}>Publier</Button>
              </Col>
              <Col lg={6}>
                <Button type="submit" bsStyle="btn btn-action-button">Sauvegarder cette version</Button>
              </Col>
            </Row>
          </Col>
          <Col lg={8} className="form-creation">
            <FieldArray name="qualitySurveyForm" component={Section} dragSource="SECTION" dropTarget="SECTION" />
          </Col>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    surveyTemplateDetails: state.form.Administration.qualitySurvey.values.details,
  };
}

function mapDispatchToProps(state) {
  return dispatch => bindActionCreators({
    getQualitySurveyForm,
    sendQualitySurvey,
    sendEditingQualitySurvey,
    publishQualitySurvey,
  }, dispatch);
}

ManageQualitySurvey = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageQualitySurvey);

export default reduxForm({
  form: 'Administration.qualitySurvey',
  initialValues: {
    lastChangeSet: {
      changeList: [],
    },
    details: {},
  },
})(withRouter(ManageQualitySurvey));
