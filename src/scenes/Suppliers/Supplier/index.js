import React, { Component } from 'react';
import { Col, Grid, Nav, NavItem, Row, Tab, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchSupplier, keepInMemoryActiveTab } from '../actions';
import ContactList from '../components/ContactList/index';
import Spinner from '../../../components/Spinner';
import '../styles/style.css';
import SupplierCard from '../components/SupplierCard/index';

class Supplier extends Component {
  componentDidMount() {
    const { fetchSupplier, match } = this.props;
    fetchSupplier(match.params.id);
  }

  registerActiveTab = (tabIndex) => {
    const { keepInMemoryActiveTab } = this.props;
    keepInMemoryActiveTab(tabIndex);
  };

  render() {
    const { supplier, isLoading, activeTab } = this.props;

    return (
      <Grid className="supplier" fluid>
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
                        <h3>Contacts</h3>
                        <ContactList suppliers={supplier.contactPersonList} />
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSupplier,
    keepInMemoryActiveTab,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
