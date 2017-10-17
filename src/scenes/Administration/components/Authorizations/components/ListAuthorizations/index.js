import React, { Component } from 'react'
import { Row, Col, Button, Form, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import Select from '../../../../../../components/Fields/select'
import renderInput from '../../../../../../components/Fields/input'
import { Field, reduxForm, FieldArray } from 'redux-form'

const renderMembers = ({ fields, responsibilities, scopes, name, handleSubmit, onSubmit, meta: { touched, error } }) => (console.log('FIELDSS', name),
  <ul>
    {fields.map((member, index) =>
      <li key={index}>
        <form onSubmit={handleSubmit}>
			<Col xs={3} md={3} lg={3} >
				<Field type="text" name={`${member}.email` || `${member}.name`} withoutLabel placeholder="Nom" component={renderInput}>Nom</Field>
			</Col>
			<Col xs={4} md={4} lg={4} >
				<Field componentClass="select" name={`${member}.function`} options={responsibilities} withoutLabel  component={Select}></Field>
			</Col>
			<Col xs={4} md={4} lg={4} >
				<Field componentClass="select" name={`${member}.scope`} options={scopes} withoutLabel  component={Select}></Field>
			</Col>
			<Col xs={1} md={1} lg={1} >
				<Button type="submit" bsStyle="action-button font-icon"><Glyphicon glyph="ok" /></Button>
			</Col>
		</form>
      </li>
    )}
  </ul>
)

const ListAuthorizations = (props) => {
  const { handleSubmit, onSubmit, pristine, reset, submitting, name, responsibilities, scopes } = props
  console.log('FIELDSS', name);
  return (
      <FieldArray name={name} component={renderMembers} handleSubmit={handleSubmit} onSubmit={onSubmit} scopes={scopes} responsibilities={responsibilities}/>
  )
}

function mapStateToProps(state, ownProps) {
	return {
		responsibilities: state.form.Administration.authorization.responsibilities,
		scopes: state.form.Administration.authorization.scopes,
		form: ownProps.form,
	}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({}, dispatch)
}

export default compose(
    connect(mapStateToProps),
    reduxForm({
		destroyOnUnmount: false
	}
))(ListAuthorizations)