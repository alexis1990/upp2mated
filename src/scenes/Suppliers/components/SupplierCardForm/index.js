import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col, Row, Glyphicon } from 'react-bootstrap';
import { addTeamField, removeTeamField } from '../../actions';
import renderInput from '../../../../components/Fields/input';
import Select from '../../../../components/Fields/select';

const SupplierCardForm = () => (
  <Col xs={12} md={12} lg={12}>
    <h3>Fiche Fournisseur</h3>
    <Row className="show-grid">
      <Col xs={12} md={12} lg={12}>
        <Field type="text" placeholder="Nom" label="Nom" name="name" component={renderInput}>Nom</Field>
        <Field type="text" placeholder="Capital Social" label="Capital Social" name="socialCapital" component={renderInput}>Capital Social</Field>
        <Field type="text" placeholder="Adresse du Siège" label="Adresse du Siège" name="headquarterAdress" component={renderInput}>Adresse du Siège</Field>
        <Field type="text" placeholder="Activités Principales" label="Activités Principales" name="principalActivities" component={renderInput}>Activités Principales</Field>
        <Field type="text" placeholder="N° de TVA Intracommunautaire" label="N° de TVA Intracommunautaire" name="intraCommunityVatNumber" component={renderInput}>N° de TVA Intracommunautaire</Field>
        <Field type="text" placeholder="SIRET" label="SIRET" name="siret" component={renderInput}>SIRET</Field>
        <Field type="text" placeholder="Buns" label="Buns" name="buns" component={renderInput}>Buns</Field>
        {/*<Field componentClass="select" options={[]} label="Catégories d'achats" name="purchaseCategorySet" component={Select}>Catégories d'achats</Field>*/}
        <Field type="text" placeholder="Organisation" label="Organisation" name="organization" component={renderInput}>Organisation</Field>
        <Field type="text" placeholder="Centre des coûts" label="Centre des coûts" name="costCenter" component={renderInput}>Centre des coûts</Field>
      </Col>
      <Col xs={12} md={12} lg={12} className="align-right">
        <Button type="submit" bsStyle="action-button">Valider</Button>
      </Col>
    </Row>
  </Col>
);


const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SupplierCardForm);
