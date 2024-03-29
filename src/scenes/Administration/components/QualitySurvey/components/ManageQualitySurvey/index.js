import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Col, Row } from 'react-bootstrap';
import { FieldArray, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Section from './components/SectionQualitySurvey/';
import { getQualitySurveyForm, publishQualitySurvey, saveQualitySurveyChangeSet, sendQualitySurvey, dispatchToaster } from '../../actions';
import './styles/style.css';
import { isModalVisible } from '../../../../../../components/Modal/actions';
import ConfirmDiscardQualitySurveyModal, { CONFIRM_DISCARD_QUALITY_SURVEY_MODAL } from './components/ConfirmDiscardQualitySurveyModal/';
import Modal from '../../../../../../components/Modal';


class ManageQualitySurvey extends Component {
  state = {
    qualitySurveyForm: null,
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
    if (nextProps.qualitySurveyForm && !this.state.qualitySurveyForm) {
      this.state.qualitySurveyForm = nextProps.qualitySurveyForm;
    }
  }

  hasChangeSetBeenModified = () => !_.isEqual(this.state.qualitySurveyForm, this.props.qualitySurveyForm);

  goBack = () => {
    const { isModalVisible, history } = this.props;

    if (this.hasChangeSetBeenModified()) {
      isModalVisible(true, CONFIRM_DISCARD_QUALITY_SURVEY_MODAL, null);
    } else {
      history.push('/administration/');
    }
  };

  saveQualitySurvey(survey) {
    const { sendQualitySurvey, saveQualitySurveyChangeSet, dispatchToaster, match, history, location } = this.props;
    const surveyTemplateId = match.params.id;

    if (!this.hasChangeSetBeenModified()) {
      return dispatchToaster('Aucun changement a sauvegardé !', 'warning');
    }

    if (!surveyTemplateId) {
      console.log('[DEBUG] - Cette méthode doit être supprimé !');
      return sendQualitySurvey(survey, history);
    }

    return saveQualitySurveyChangeSet(survey, surveyTemplateId, history, location);
  }

  publishTemplate(templateId) {
    const { publishQualitySurvey, history, dispatchToaster } = this.props;

    if (this.hasChangeSetBeenModified()) {
      dispatchToaster('Sauvegarder ou annuler vos modifications avant de publier une nouvelle version !', 'error');
    } else {
      publishQualitySurvey(templateId, history);
    }
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
        <Form onSubmit={handleSubmit(this.saveQualitySurvey.bind(this))} className="quality-survey">
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

const mapStateToProps = state => ({
  isVisible: state.modal.mode,
  qualitySurveyForm: state.form.Administration.qualitySurvey.values.qualitySurveyForm,
  lastChangeSet: state.form.Administration.qualitySurvey.values.lastChangeSet,
  surveyTemplateDetails: state.form.Administration.qualitySurvey.values.details,
});

const mapDispatchToProps = () => dispatch => bindActionCreators({
  getQualitySurveyForm,
  sendQualitySurvey,
  saveQualitySurveyChangeSet,
  publishQualitySurvey,
  isModalVisible,
  dispatchToaster,
}, dispatch);

export default compose(
  reduxForm({
    form: 'Administration.qualitySurvey',
    initialValues: {
      lastChangeSet: {},
      details: {},
    },
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ManageQualitySurvey);
