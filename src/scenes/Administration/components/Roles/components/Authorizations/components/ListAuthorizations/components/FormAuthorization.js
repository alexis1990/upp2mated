import React, { Component } from 'react'
import { Col, Button, Form, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Select from '../../../../../../../../../components/Fields/select'
import renderInput from '../../../../../../../../../components/Fields/input'
import { Field, reduxForm } from 'redux-form'
import { postRowAuthorization } from '../../../../../../../actions'

let RowAuthorizations = (props) => {
	const { handleSubmit, responsibilities, scopes, name } = props;

	return (
		<Form onSubmit={handleSubmit}>
			<Col xs={3} md={3} lg={3} >
				{name === 'team' ?
					<Field type="text" name="name" withoutLabel placeholder="Nom" component={renderInput}>Nom</Field>
					:
					<Field type="text" name="email" withoutLabel placeholder="Email" component={renderInput}>Email</Field>
				}
			</Col>
			<Col xs={4} md={4} lg={4} >
				<Field componentClass="select" options={responsibilities} withoutLabel name="function" component={Select}></Field>
			</Col>
			<Col xs={4} md={4} lg={4} >
				<Field componentClass="select" options={scopes} withoutLabel name="scope" component={Select}></Field>
			</Col>
			<Col xs={1} md={1} lg={1} >
				<Button type="submit" bsStyle="action-button font-icon"><Glyphicon glyph="ok" /></Button>
			</Col>
		</Form>
	)
}

export default RowAuthorizations = reduxForm({
	destroyOnUnmount: true
})(RowAuthorizations);