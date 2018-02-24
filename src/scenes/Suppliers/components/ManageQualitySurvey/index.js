import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Section from './components/SectionQualitySurvey/';
import renderInput from '../../../../components/Fields/input';
import { sendReply } from '../../actions';
import './styles/style.css';

const required = value => (value ? undefined : ' ');

class ManageQualitySurvey extends Component {
  componentWillMount() {
    const { match } = this.props;
  }

  sendQualitySurveyReply(survey) {
    const { sendReply, match } = this.props;
    const { templateId, supplierId } = match.params;

    sendReply(survey, templateId, supplierId);
  }

  render() {
    const { handleSubmit, lastEditingVersionBySupplier, templatePublishedVersion, pristine, reset, submitting } = this.props;
    const { name, description } = this.props.details;
    return (
      <div>
        <Form onSubmit={handleSubmit(this.sendQualitySurveyReply.bind(this))} className="quality-survey-reply">
          <Col lg={4}>
            <h3>Questionnaire Qualité :</h3>
            <h4>{name}</h4>
            <h5>{description}</h5>
            <div>Version du questionnaire qualité: {templatePublishedVersion}</div>
            <div>dernière version complétée: {lastEditingVersionBySupplier}</div>
          </Col>
          <Col lg={8} className="form-creation">
            <FieldArray name="qualitySurveyForm" noneButton component={Section} />
          </Col>
          <Col lg={12} className="align-right">
            <Button bsStyle="btn btn-action-button" type="submit">Envoyer</Button>
          </Col>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  details: state.form.Suppliers.qualitySurvey.values.details,
  lastEditingVersionBySupplier: state.form.Suppliers.qualitySurvey.values.lastEditingVersionBySupplier,
  templatePublishedVersion: state.form.Suppliers.qualitySurvey.values.templatePublishedVersion,
});

const mapDispatchToProps = state => dispatch => bindActionCreators({
  sendReply,
}, dispatch);

export default compose(
  withRouter,
  reduxForm({
    form: 'Suppliers.qualitySurvey',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ManageQualitySurvey);
