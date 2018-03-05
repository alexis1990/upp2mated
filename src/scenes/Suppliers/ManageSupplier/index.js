import React, { Component } from 'react';
import { Col, Grid, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSupplier } from '../actions';
import ContactList from '../components/ContactList/index';
import SupplierCardForm from './../components/SupplierCardForm';
import FinancialHealth from './components/FinancialHealth';
import './styles/style.css';

class ManageSupplier extends Component {
  state = { contactPersonList: [] };

  componentWillMount() {
    const { match, fetchSupplier } = this.props;
    const supplierId = match.params.id;
    if (supplierId) {
      fetchSupplier(supplierId);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ contactPersonList: nextProps.supplier.contactPersonList });
  }

  render() {
    const { supplier, match } = this.props;
    const supplierId = match.params.id;
    return (
      <Grid fluid>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={4}>
              <h3> {supplierId ? `Fournisseur ${supplier.name}` : 'Nouveau Fournisseur'}</h3>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">
                  Fiche du fournisseur
                </NavItem>
                <NavItem eventKey="second">
                  Santé financiére
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <SupplierCardForm />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <FinancialHealth supplierId={supplierId} contactPersonList={this.state.contactPersonList} />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <ContactList suppliers={this.state.contactPersonList} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  supplier: state.form.Suppliers.supplier,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSupplier,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageSupplier);
