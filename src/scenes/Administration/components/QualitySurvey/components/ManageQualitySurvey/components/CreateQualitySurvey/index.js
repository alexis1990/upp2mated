import React, {Component} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {Field, Form, reduxForm} from 'redux-form'

import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import renderInput from "../../../../../../../../components/Fields/input";
import {bindActionCreators} from "redux";
import {isModalVisible} from "../../../../../../../../components/Modal/actions";
import {getQualitySurveys} from "../../../../actions";
import axios from "axios/index";

const required = value => value ? undefined : ' ';

export const QUALITY_SURVEY_MODAL = "qualitysurvey.create";

class CreateQualitySurveyModal extends Component {

  escFunction = event => {
    if (event.keyCode === 27) {
      const {isModalVisible} = this.props;
      isModalVisible(false, QUALITY_SURVEY_MODAL);
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  saveQualitySurveyTemplate = () => {
    const {isModalVisible, getQualitySurveys, form} = this.props;

    axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/`, form)
      .then(response => {
        isModalVisible(false, QUALITY_SURVEY_MODAL);
        getQualitySurveys(0);
      })
      .catch(error => console.error('ERROR', error))
  };

  render() {
    const {handleSubmit, isModalVisible} = this.props;

    return (
      <Row className="select-supplier-modal">
        <Col xs={12} md={12} lg={12} className="list users-list">
          <Col xs={12} md={12} lg={12} className="align-right send-button">
            <Form onSubmit={handleSubmit(this.saveQualitySurveyTemplate)}>
              <Col lg={12}>
                <h3>Questionnaire Qualité :</h3>
                <Field name="name" label="nom" component={renderInput} validate={[required]}/>
                <Field name="description" label="description" component={renderInput} validate={[required]}/>
                <Row className="buttons-actions">
                  <Col lg={6}>
                    <Button type="button" bsStyle="btn btn-action-button" onClick={() => isModalVisible(false, QUALITY_SURVEY_MODAL)}>Annuler</Button>
                  </Col>
                  <Col lg={6}>
                    <Button type="submit" bsStyle="btn btn-action-button">Sauvegarder</Button>
                  </Col>
                </Row>
              </Col>
            </Form>
          </Col>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    form: state.form.Administration.qualitySurvey.create.values
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({isModalVisible, getQualitySurveys}, dispatch);
}

export default reduxForm({
  form: 'Administration.qualitySurvey.create',
  initialValues: {
    name: "",
    description: ""
  },
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateQualitySurveyModal)))
