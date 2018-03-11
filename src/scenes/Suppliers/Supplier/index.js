import React, { Component } from 'react';
import { Button, Col, Grid, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { askInformationsToSupplier, fetchSupplier, keepInMemoryActiveTab } from '../actions';
import ContactList from '../components/ContactList/index';
import Spinner from '../../../components/Spinner';
import '../styles/style.css';
import SupplierCard from '../components/SupplierCard/index';
import ContactFormModal, { CONTACT_FORM_MODAL } from '../components/ContactFormModal';
import AskInformationSupplierModal, { ASK_INFORMATION_SUPPLIER_MODAL } from '../components/AskInformationSupplierModal';
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

  askToSupplier = () => {
    const { isModalVisible } = this.props;
    isModalVisible(true, ASK_INFORMATION_SUPPLIER_MODAL);
  };

  render() {
    const { supplier, isLoading, activeTab, isVisible, match } = this.props;

    return (
      <Grid className="supplier" fluid>
        <Modal isVisible={isVisible} activeNameModal={CONTACT_FORM_MODAL} component={<ContactFormModal supplierId={match.params.id} />} />
        <Modal isVisible={isVisible} activeNameModal={ASK_INFORMATION_SUPPLIER_MODAL} component={<AskInformationSupplierModal supplier={supplier} contacts={supplier.contactPersonList} />} />
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
                    <Tab.Pane eventKey="first" className="supplier-card">
                      <Row>
                        <Col sm={2} smPush={6}>
                          <Link to={`/suppliers/supplier/edit/${supplier.id}`}>
                            <Button bsClass="btn btn-action-button">Editer la fiche fournisseur</Button>
                          </Link>
                        </Col>
                        <Col sm={2} smPush={6}>
                          <Button bsClass="btn btn-action-button" onClick={() => this.askToSupplier()}>Demander au fournisseur ses informations</Button>
                        </Col>
                      </Row>
                      <Col xs={12} md={12} lg={12}>
                        <h3>Fiche Fournisseur</h3>
                        <SupplierCard supplier={supplier} />
                      </Col>
                      <Col xs={12} md={12} lg={12}>
                        <ContactList contacts={supplier.contactPersonList} supplierId={supplier.id} />
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

const mapStateToProps = (state, ownProps) => ({
  activeTab: state.form.Suppliers.activeTab,
  supplier: state.form.Suppliers.supplier,
  isLoading: state.form.Suppliers.isLoading,
  isVisible: state.modal.mode,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSupplier,
  keepInMemoryActiveTab,
  askInformationsToSupplier,
  isModalVisible,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
