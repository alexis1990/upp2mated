import React, { Component } from 'react'
import { Row, Col, Button, Form, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from '../../../../../../components/Fields/select'
import { Field, reduxForm } from 'redux-form'

let formSection = '';

const ListAuthorizations = (props) => {
	const { handleSubmit, onSubmit, list, name, section } = props; // Notice two functions, not one! Only onSubmit is passed in by you as a prop. The other is passed in by redux-form
	formSection = section;
	return (
		<Row>
			{list.map((item, index) => (
				<div>
					<Form onSubmit={handleSubmit}>
						<Col xs={3} md={3} lg={3} >
							{(item && item.email) || (item && item.name)}
						</Col>
						<Col xs={4} md={4} lg={4} >
							<Field componentClass="select" options={[{ name: 'okokok', values: 'okokko' }, { name: 'okokok', values: 'okokko' }]} withoutLabel name={`${name}[${index}].function`} component={Select}></Field>
						</Col>
						<Col xs={4} md={4} lg={4} >
							<Field componentClass="select" options={[{ name: 'okokok', values: 'okokko' }, { name: 'okokok', values: 'okokko' }]} withoutLabel name={`${name}[${index}].level`} component={Select}></Field>
						</Col>
						<Col xs={1} md={1} lg={1} >
							<Button type="submit" bsStyle="action-button font-icon"><Glyphicon glyph="ok" /></Button>
						</Col>
					</Form>
				</div>
			)
			)
			}
		</Row>
	)
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({}, dispatch)
}

export default reduxForm({
	form: 'Administration.authorization.' + formSection,
	initialValues: {
		teams: [],
		users: {
			content: []
		},
	},
	destroyOnUnmount: false
})(connect(mapStateToProps, mapDispatchToProps)(ListAuthorizations))