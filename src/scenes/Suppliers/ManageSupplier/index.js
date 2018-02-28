import React, { Component } from 'react';
import { Col, Grid, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import SupplierCardForm from '../components/SupplierCardForm/index';
import { fetchSupplier, postSupplier, updateSupplierCard } from '../actions';
import ContactList from '../components/ContactList/index';
import '../styles/style.css';

class ManageSupplier extends Component {
  state = {
    contactPersonList: [],
  };

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

  submit(values) {
    const { history, updateSupplierCard } = this.props;
    const { id } = this.props.match.params;

    updateSupplierCard(id, values, history);
  }

  render() {
    const { handleSubmit, supplier, match } = this.props;
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
                <NavItem eventKey="third">
                  Contacts
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <form onSubmit={handleSubmit(this.submit.bind(this))}>
                    <SupplierCardForm />
                  </form>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
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
  postSupplier,
  fetchSupplier,
  updateSupplierCard,
}, dispatch);

export default compose(
  reduxForm({
    form: 'Suppliers.ManageSupplier',
    initalValues: {

    }
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ManageSupplier);
