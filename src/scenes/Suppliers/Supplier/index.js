import React, { Component } from 'react';
import { Button, Col, Grid, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchSupplier, keepInMemoryActiveTab, preloadContact } from '../actions';
import ContactList from '../components/ContactList/index';
import Spinner from '../../../components/Spinner';
import '../styles/style.css';
import SupplierCard from '../components/SupplierCard/index';
import ContactFormModal, { CONTACT_FORM_MODAL } from '../components/ContactFormModal';
import Modal from '../../../components/Modal/';
import { isModalVisible } from '../../../components/Modal/actions';

class Supplier extends Component {
  componentDidMount() {
    const { fetchSupplier, match } = this.props;
    fetchSupplier(match.params.id);
  }

  registerActiveTab = (tabIndex) => {
    const { keepInMemoryActiveTab } = this.props;
    keepInMemoryActiveTab(tabIndex);
  };

  openContactFormModal = (contact) => {
    const { isModalVisible, preloadContact } = this.props;

    preloadContact(contact);
    isModalVisible(true, CONTACT_FORM_MODAL);
  };

  render() {
    const { supplier, isLoading, activeTab, isVisible } = this.props;

    return (
      <Grid className="supplier" fluid>
        <Modal isVisible={isVisible} activeNameModal={CONTACT_FORM_MODAL} component={<ContactFormModal supplierId={this.props.match.params.id} />} />
        {
          isLoading || typeof supplier === 'undefined' ?
            <Spinner />
            :
            <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab || 'first'}>
              <Row className="clearfix">
                <Col sm={4}>
                  <h3>Fournisseur {supplier.name}</h3>
                  <Nav bsStyle="pills" activeKey={activeTab} stacked>
                    <NavItem eventKey="first" onClick={() => this.registerActiveTab('first')}>
                      Fiche Fournisseur
                    </NavItem>
                    <NavItem eventKey="second" onClick={() => this.registerActiveTab('second')}>
                      Santé financiére
                    </NavItem>
                    <NavItem eventKey="third" onClick={() => this.registerActiveTab('third')}>
                      Questionnaire Qualité
                    </NavItem>
                    <NavItem eventKey="fourth" onClick={() => this.registerActiveTab('fourth')}>
                      Evaluations
                    </NavItem>
                  </Nav>
                </Col>
                <Col sm={8}>
                  <Tab.Content animation unmountOnExit>
                    <Tab.Pane eventKey="first">
                      <Row>
                        <Col sm={2} smPush={6}>
                          <Link to={`/suppliers/supplier/edit/${supplier.id}`}>
                            <Button bsStyle="btn btn-action-button">Editer la fiche fournisseur</Button>
                          </Link>
                        </Col>
                        <Col sm={2} smPush={6}>
                          <Button bsStyle="btn btn-action-button">Demander au fournisseur ses informations</Button>
                        </Col>
                      </Row>
                      <Col xs={12} md={12} lg={12}>
                        <h3>Fiche Fournisseur</h3>
                        <SupplierCard supplier={supplier} />
                      </Col>
                      <Col xs={12} md={12} lg={12}>
                        <Row>
                          <Col xs={11} md={11} lg={11}><h3>Contacts</h3></Col>
                          <Col xs={1} md={1} lg={1}><Button bsStyle="btn btn-action-button" onClick={() => this.openContactFormModal()}>Ajouter un contact</Button></Col>
                        </Row>
                        <ContactList suppliers={supplier.contactPersonList} openModal={this.openContactFormModal} />
                      </Col>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second"></Tab.Pane>
                    <Tab.Pane eventKey="third"></Tab.Pane>
                    <Tab.Pane eventKey="fourth"></Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
        }
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    activeTab: state.form.Suppliers.activeTab,
    supplier: state.form.Suppliers.supplier,
    isLoading: state.form.Suppliers.isLoading,
    isVisible: state.modal.mode,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSupplier,
    keepInMemoryActiveTab,
    isModalVisible,
    preloadContact,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
