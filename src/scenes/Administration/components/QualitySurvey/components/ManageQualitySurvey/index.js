import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Col, Row } from 'react-bootstrap';
import { FieldArray, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Section from './components/SectionQualitySurvey/';
import { getQualitySurveyForm, publishQualitySurvey, sendEditingQualitySurvey, sendQualitySurvey } from '../../actions';
import './styles/style.css';
import { isModalVisible } from '../../../../../../components/Modal/actions';
import ConfirmDiscardQualitySurveyModal, { CONFIRM_DISCARD_QUALITY_SURVEY_MODAL } from './components/ConfirmDiscardQualitySurveyModal/';
import Modal from '../../../../../../components/Modal';

const required = value => (value ? undefined : ' ');

class ManageQualitySurvey extends Component {
  state = {
    lastChangeSet: {},
  };

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastChangeSet.changeList && Object.keys(this.state.lastChangeSet).length === 0) {
      this.state.lastChangeSet = {
        ...nextProps.lastChangeSet,
      };
    }
  }

  goBack = () => {
    const { isModalVisible, history } = this.props;

    if (!_.isEqual(this.state.lastChangeSet, this.props.lastChangeSet)) {
      isModalVisible(true, CONFIRM_DISCARD_QUALITY_SURVEY_MODAL, null);
    } else {
      history.push('/administration/');
    }
  };

  sendQualitySurvey(survey) {
    const { sendQualitySurvey, sendEditingQualitySurvey, match, history } = this.props;
    const surveyTemplateId = match.params.id;

    if (surveyTemplateId) {
      sendEditingQualitySurvey(survey, surveyTemplateId, history);
    } else {
      console.log('[DEBUG] - Cette méthode doit être supprimé !');
      sendQualitySurvey(survey, history);
    }
  }

  publishTemplate(templateId) {
    const { publishQualitySurvey, history } = this.props;
    publishQualitySurvey(templateId, history);
  }

  render() {
    const { id, name, description, editedVersion, publishedVersion } = this.props.surveyTemplateDetails;
    const { handleSubmit, isVisible } = this.props;

    return (
      <div>
        <Modal isVisible={isVisible} activeNameModal={CONFIRM_DISCARD_QUALITY_SURVEY_MODAL} component={<ConfirmDiscardQualitySurveyModal />} />
        <Col lg={12}>
          <Col lg={4}>
            <Button type="button" bsStyle="btn btn-action-button" onClick={() => this.goBack()}>
              Retour
            </Button>
          </Col>
        </Col>
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
    isVisible: state.modal.mode,
    lastChangeSet: state.form.Administration.qualitySurvey.values.lastChangeSet,
    surveyTemplateDetails: state.form.Administration.qualitySurvey.values.details,
  };
}

function mapDispatchToProps(state) {
  return dispatch => bindActionCreators({
    getQualitySurveyForm,
    sendQualitySurvey,
    sendEditingQualitySurvey,
    publishQualitySurvey,
    isModalVisible,
  }, dispatch);
}

ManageQualitySurvey = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageQualitySurvey);

export default reduxForm({
  form: 'Administration.qualitySurvey',
  initialValues: {
    lastChangeSet: {},
    details: {},
  },
})(withRouter(ManageQualitySurvey));
