import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';
import { postSupplier } from '../../../actions';
import renderInput from '../../../../../components/Fields/input';
import Select from '../../../../../components/Fields/select';
import ContactList from '../../../components/ContactList/index';

const { DOM: { input } } = React;
// todo unused component to remove
class FormSupplier extends Component {
  submit(values) {
    const { postSupplier } = this.props;
    postSupplier(values);
  }

  render() {
    const { handleSubmit, fields, contactPersonList } = this.props;
    return (
      <Col xs={12} md={12} lg={12}>
        <h3>Fiche Fournisseur</h3>
        <Row className="show-grid">
          <form onSubmit={handleSubmit(this.submit.bind(this))}>
            <Col xs={12} md={12} lg={12}>
              <Field type="text" placeholder="Nom" label="Nom" name="name" component={renderInput}>Nom</Field>
              <Field componentClass="select" options={[]} label="Profil" name="profil" component={Select}></Field>
              <Field componentClass="select" options={[]} label="Typologie" name="typology" component={Select}></Field>
              <Field type="text" placeholder="Technologie" label="Technologie" name="technology" component={renderInput}>Technologie</Field>
              <Field type="text" placeholder="Coeur de Métier" label="Coeur de Métier" name="coreBusiness" component={renderInput}>Coeur de Métier</Field>
              <Field type="text" placeholder="Description" label="Description" name="description" component={renderInput}>Description</Field>
              <Field componentClass="select" options={[]} label="Certification" name="certification" component={Select}></Field>
              <Field type="text" placeholder="Localisation Siége" label="Localisation Siége" name="localisation" component={renderInput}>Localisation Siége</Field>
              <ContactList contacts={contactPersonList} />
            </Col>
            <Col xs={12} md={12} lg={12} className="align-right">
              <Button type="submit" bsStyle="action-button">Valider</Button>
            </Col>
          </form>
        </Row>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    postSupplier,
  }, dispatch);
}

export default reduxForm({
  form: 'Suppliers.manageSupplier',
})(connect(mapStateToProps, mapDispatchToProps)(FormSupplier));
