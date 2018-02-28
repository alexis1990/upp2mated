import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'react-bootstrap';
import { FieldArray, Form, reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Section from './components/SectionQualitySurvey/';
import { sendReply } from '../../actions';
import './styles/style.css';

class ManageQualitySurvey extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    lastEditingVersionBySupplier: PropTypes.number.isRequired,
    templatePublishedVersion: PropTypes.number.isRequired,
    details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    details: {
      name: '',
      description: '',
    },
  };

  componentWillMount() {
    const { match } = this.props;
  }

  sendQualitySurveyReply(survey) {
    const { sendReply, match, history, location } = this.props;
    const { templateId, supplierId } = match.params;

    sendReply(survey, templateId, supplierId, history, location);
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
            <FieldArray name="content" noneButton component={Section} />
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
  reduxForm({
    form: 'Suppliers.qualitySurvey',
    initialValues: {
      content: [],
      details: {},
    },
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ManageQualitySurvey);
