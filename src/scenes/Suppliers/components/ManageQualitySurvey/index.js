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
    return (
      <div>
        <Form onSubmit={handleSubmit(this.sendQualitySurveyReply.bind(this))}>
          <Col lg={4}>
            <h3>Questionnaire Qualité :</h3>
            <Field name="name" label="nom" component={renderInput} disabled validate={[required]} />
            <Field name="description" label="description" component={renderInput} disabled validate={[required]} />
            <div>Version d'édition : {lastEditingVersionBySupplier}</div>
            <div>Version de Publication : {templatePublishedVersion}</div>
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
