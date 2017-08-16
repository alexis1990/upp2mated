import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTeamField, removeTeamField } from '../../../../actions'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col, Row, Glyphicon } from 'react-bootstrap'
import renderInput from '../../../../../../components/Fields/input'
import { Field, reduxForm } from 'redux-form'
const { DOM: { input } } = React

const Supplier = ({ handleSubmit, fields, addTeamField, removeTeamField, listTeamMembers }) => {
  return (
    <Col xs={12} md={12} lg={12}>
      <h4>Equipe Technique</h4>
      <Row className="show-grid">
          <Col xs={12} md={12} lg={12}>
            <Field type="text" placeholder="Nom" withoutLabel name={`name`} component={renderInput}>Nom</Field>
            <Field type="text" placeholder="Email" withoutLabel name={`email`} component={renderInput}>Email</Field>
            <Field type="text" placeholder="Organisation" withoutLabel name={`organization`} component={renderInput}>Organisation</Field>
            <Field type="text" placeholder="Poste" withoutLabel name={`jobPosition`} component={renderInput}>Poste</Field>
          </Col>
          <Col xs={12} md={8} lg={12}>
            <Button type="submit" bsStyle="action-button font-icon"><Glyphicon glyph="send"/></Button>
          </Col>
      </Row>
    </Col>
  )
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({}, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (Supplier);
