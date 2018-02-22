import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Col, Glyphicon, Pagination, Table } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isModalVisible } from '../../../../components/Modal/actions';
import { editQualitySurvey, getQualitySurveys } from './actions';
import './styles/style.css';

import { QUALITY_SURVEY_MODAL } from './components/ManageQualitySurvey/components/CreateQualitySurveyModal/';

class QualitySurveys extends Component {
  componentWillMount() {
    const { getQualitySurveys } = this.props;
    this.state = {
      activePage: 0,
      createQualitySurveyModal: false,
    };
    getQualitySurveys(0);
    this.handleSelect = this.handleSelect.bind(this);
    this.openModalToSendQSToSupplier = this.openModalToSendQSToSupplier.bind(this);
  }

  handleSelect(eventKey) {
    const { getQualitySurveys } = this.props;
    getQualitySurveys(eventKey - 1);
    this.setState({
      activePage: eventKey,
    });
  }

  editQualitySurvey(survey, history) {
    if (survey.editedVersion === survey.publishedVersion) {
      editQualitySurvey(survey).then(() => {
        history.push(`/administration/quality-surveys/quality-survey/edit/${survey.id}/${survey.editedVersion + 1}`);
      });
    } else {
      history.push(`/administration/quality-surveys/quality-survey/edit/${survey.id}/${survey.editedVersion}`);
    }
  }

  openModalToSendQSToSupplier(survey) {
    const { isModalVisible } = this.props;
    const templateId = survey.id;

    isModalVisible(true, null, templateId);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, qualitySurveys, isVisible, history } = this.props;
    return (
      <div>
        <Col lg={12}>
          <Col lg={12}>
            <h3>Questionnaires Qualitées :</h3>
          </Col>
          <Col lg={12} className="new-survey-action align-right">
            <Button type="button" className="action-button" bsStyle="btn btn-action-button" onClick={() => this.props.isModalVisible(true, QUALITY_SURVEY_MODAL, null)}>
              <Glyphicon glyph="eye-plus" /> Créer un questionnaire
            </Button>
          </Col>
        </Col>
        <Col xs={12} md={12} lg={12} className="list-surveys list">
          <Table responsive>
            <thead>
            <tr>
              <th>Nom du questionnaire</th>
              <th>Description</th>
              <th className="align-center">Version</th>
              <th className="align-center">Version publiée</th>
              <th className="align-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {qualitySurveys.content.map((survey) => (
              <tr key={survey.id}>
                <td width="20%">{survey.name}</td>
                <td width="20%">{survey.description}</td>
                <td width="10%" className="align-center"> {survey.editedVersion}</td>
                <td width="20%" className="align-center"> {survey.publishedVersion}</td>
                <td className="actions" width="30%">
                  <ButtonGroup justified>
                    <Button type="button" className="action-button" onClick={() => this.openModalToSendQSToSupplier(survey)}><Glyphicon glyph="send" /></Button>
                    <Button onClick={this.editQualitySurvey.bind(this, survey, history)} className="action-button">
                      <Glyphicon glyph="pencil" />
                    </Button>
                    <Button className="action-button" onClick={() => console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove" /></Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
          <Pagination
            bsSize="medium"
            items={qualitySurveys.totalPages}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isVisible: state.modal.mode,
  qualitySurveys: state.form.Administration.qualitySurveys.values,
});


const mapDispatchToProps = state => dispatch => bindActionCreators({
  getQualitySurveys,
  editQualitySurvey,
  isModalVisible,
}, dispatch);

QualitySurveys.propTypes = {
  survey: PropTypes.shape({
    editedVersion: PropTypes.string.isRequired,
    publishedVersion: PropTypes.string.isRequired,
  }),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QualitySurveys));