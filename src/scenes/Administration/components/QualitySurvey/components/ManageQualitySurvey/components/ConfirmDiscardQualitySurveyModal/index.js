import React, { Component } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isModalVisible } from '../../../../../../../../components/Modal/actions';
import { getQualitySurveys } from '../../../../actions';

const required = value => value ? undefined : ' ';

export const CONFIRM_DISCARD_QUALITY_SURVEY_MODAL = 'qualitysurvey.discard';

class ConfirmDiscardQualitySurveyModal extends Component {

  escFunction = event => {
    if (event.keyCode === 27) {
      const { isModalVisible } = this.props;
      isModalVisible(false, CONFIRM_DISCARD_QUALITY_SURVEY_MODAL);
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    const { isModalVisible } = this.props;

    return (
      <Row className="select-supplier-modal">
        <Col xs={12} md={12} lg={12} className="list users-list">
          <Col xs={12} md={12} lg={12} className="align-right send-button">
            <Col lg={12}>
              <Modal.Header>
                <Modal.Title>Annuler les modifications ?</Modal.Title>
              </Modal.Header>
              <Modal.Body>Vous êtes sur le point de quitter cette page, vous perdrez alors toutes les modifications en cours.</Modal.Body>
              <Modal.Footer>
                <Button type="button" bsStyle="btn btn-action-button btn-primary" onClick={() => isModalVisible(false, CONFIRM_DISCARD_QUALITY_SURVEY_MODAL)}>Annuler</Button>
                <Button type="button" bsStyle="btn btn-action-button" onClick={() => this.props.history.push('/administration/')}>Confirmer</Button>
              </Modal.Footer>
            </Col>
          </Col>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ isModalVisible, getQualitySurveys }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmDiscardQualitySurveyModal));
