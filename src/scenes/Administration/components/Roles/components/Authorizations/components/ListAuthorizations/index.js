import React, { Component } from 'react'
import { Row, Col, Button, Form, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import RowAuthorizations from './components/FormAuthorization'
import { postRowAuthorization } from '../../../../actions'


class ListAuthorizations extends Component {
	constructor() {
		super();
		this.submitRowAuthorization = this.submitRowAuthorization.bind(this)
	}

	submitRowAuthorization(rowSelected) {
		const { postRowAuthorization, role } = this.props;
		const roleId = role.values.id;
		postRowAuthorization(rowSelected, roleId);
	}

	render() {
		const { list, formName, name,  handleSubmit, role } = this.props;

		return (
			<div>
				{list.map((item, index) => {
					return <RowAuthorizations form={`${formName}[${index}].${name}`} item={item} name={name} role={role} onSubmit={this.submitRowAuthorization} />
				})
				}
			</div>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return {
		formName: ownProps.form
	}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({ postRowAuthorization }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ListAuthorizations);
