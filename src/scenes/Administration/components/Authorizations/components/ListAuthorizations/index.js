import React, { Component } from 'react'
import { Row, Col, Button, Form, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import Select from '../../../../../../components/Fields/select'
import renderInput from '../../../../../../components/Fields/input'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import RowAuthorizations from './components/FormAuthorization'
import { postRowAuthorization } from '../../../../actions'


class ListAuthorizations extends Component{
	constructor() {
		super();
		this.submitRowAuthorization = this.submitRowAuthorization.bind(this)
	}

	submitRowAuthorization(rowSelected) {
		const { postRowAuthorization } = this.props;
		postRowAuthorization(rowSelected);
	}
	
	render() {
		const { list, formName, name, responsibilities, handleSubmit } = this.props;

		return (
			<div>
				{	list.map((item, index) => {
						return <RowAuthorizations form={`${formName}[${index}].${name}`} item={item} name={name} responsibilities={responsibilities} onSubmit={this.submitRowAuthorization} />
					})
				}
			</div>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return {
		responsibilities: state.form.Administration.authorization.responsibilities,
		formName: ownProps.form,
	}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({ postRowAuthorization }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps) (ListAuthorizations);
