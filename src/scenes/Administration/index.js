import React, {Component} from 'react'
import {Col, Grid, Nav, NavItem, Row, Tab} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SelectSuppliersModal from './components/QualitySurvey/components/SelectSuppliersModal/'
import {isModalVisible} from '../../components/Modal/actions'
import Modal from '../../components/Modal/'
import Teams from './components/Teams/'
import Users from './components/Users/'
import QualitySurvey from './components/QualitySurvey/'
import CreateQualitySurvey, {QUALITY_SURVEY_MODAL} from './components/QualitySurvey/components/ManageQualitySurvey/components/CreateQualitySurveyModal';
import Roles from './components/Roles/'
import './styles/style.css'

class Administration extends Component {
  render() {
    const {isVisible, modalData} = this.props;
    return (
      <Grid className="administration" fluid>
        <Modal isVisible={isVisible} component={<SelectSuppliersModal templateId={modalData}/>}/>
        <Modal isVisible={isVisible} activeNameModal={QUALITY_SURVEY_MODAL} component={<CreateQualitySurvey/>}/>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={4}>
              <h3>
                Administration
              </h3>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">
                  Equipes
                </NavItem>
                <NavItem eventKey="second">
                  Utilisateurs
                </NavItem>
                <NavItem eventKey="third">
                  Droits et roles
                </NavItem>
                <NavItem eventKey="fourth">
                  Questionnaires Qualités
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <Teams/>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Users/>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  {/* <Authorizations /> */}
                  <Roles/>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  {/* <Authorizations /> */}
                  <QualitySurvey/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    isVisible: state.modal.mode,
    modalData: state.modal.data
  }
}

function mapDispatchToProps(state) {
  return (dispatch) => bindActionCreators({isModalVisible}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Administration)