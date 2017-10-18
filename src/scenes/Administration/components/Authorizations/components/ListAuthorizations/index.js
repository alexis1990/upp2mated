import React, { Component } from 'react'
import { Row, Col, Button, Form, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import Select from '../../../../../../components/Fields/select'
import renderInput from '../../../../../../components/Fields/input'
import { Field, reduxForm, formValueSelector } from 'redux-form'

let RowAuthorizations = (props) => {
	const { handleSubmit, list, responsibilities, name } = props;

	return (
		<Form onSubmit={handleSubmit}>
			<Col xs={3} md={3} lg={3} >
			{	name === 'teams' ?
				<Field type="text" name="name" withoutLabel placeholder="Nom" component={renderInput}>Nom</Field>
				:
				<Field type="text" name="email" withoutLabel placeholder="Email" component={renderInput}>Email</Field>
			}
			</Col>
			<Col xs={4} md={4} lg={4} >
				<Field componentClass="select" options={responsibilities} withoutLabel name="function" component={Select}></Field>
			</Col>
			<Col xs={4} md={4} lg={4} >
				<Field componentClass="select" options={[]} withoutLabel name="scope" component={Select}></Field>
			</Col>
			<Col xs={1} md={1} lg={1} >
				<Button type="submit" bsStyle="action-button font-icon"><Glyphicon glyph="ok" /></Button>
			</Col>
		</Form>
	)
}


class ListAuthorizations extends Component{

	submitRowAuthorization(values) {
		console.log('RPPPP',values)
	}
	
	render() {
		const { list, formName, name } = this.props;

		return (
				<Row>
					{
						list.map((item, index) => (
							<RowAuthorizations form={`${formName}[${index}]`} name={name} item={item} onSubmit={this.submitRowAuthorization} />
						))
					}
				</Row>
			)		
		}

}

function mapStateToProps(state, ownProps) {
	console.log('OWWWWWN', ownProps.form)
	return {
		responsibilities: state.form.Administration.authorization.responsibilities,
		formName: ownProps.form
	}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({}, dispatch)
}

RowAuthorizations = compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({
	destroyOnUnmount: false
}))(RowAuthorizations);

export default ListAuthorizations;
