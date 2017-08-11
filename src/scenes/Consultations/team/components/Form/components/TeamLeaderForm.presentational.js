import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { addTechField, removeTechField } from '../../../actions'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col, Row } from 'react-bootstrap'
import renderInput from '../../../../../../components/Fields/input'
import Select from '../../../../../../components/Fields/select'
import SelectTypeahead from '../../../../../../components/Fields/selectTypeahead'
import RangeTimePicker from '../../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../../components/SingleTimePicker/index'
const { DOM: { input } } = React


const TechForm = ({ handleSubmit, fields, addTechField, removeTechField, teamLeaderActivate, listTeamMembers }) => {
	return (
		<Col xs={12} md={12} lg={12}>
			<h5>Chef de Projet ?</h5>
			<Row className="show-grid">
				<Col xs={12} md={8} lg={12}>
					<Row className="show-grid line">
						<Col sm={4} md={3} lg={1}>
			          		<Field name={`teamLeader.active`} id='employed' component="input" type="checkbox"/>
			        	</Col>
			        	{
			        		teamLeaderActivate ?
			        		<div>
						      	<Col sm={4} md={3} lg={3}>
											<Field type="select" withButton withGlyph="plus" options={listTeamMembers}  placeholder="Chercher fournisseur par nom" withoutLabel name={`teamLeader.user`} component={SelectTypeahead}>Chercher fournisseur par nom</Field>
						      	</Col>
						      	<Col sm={4} md={1} lg={2}>
						      		<Field type="text" placeholder="Poste" withoutLabel name={`teamLeader.job`} component={renderInput}>Poste</Field>
						      	</Col>
						      	<Col sm={4} md={2} lg={2}>
						      		<Field componentClass="select" withoutLabel name={`teamLeader.permission`} placeholder="nature" component={Select}>Nature</Field>
						      	</Col>
						      	<Col sm={4} md={3} lg={3}>
						      		<span>
							          <Field name={`teamLeader.visibleBySupplier`} id='visibleBySupplier' component="input" type="checkbox"/>
							        </span>
						      		<span>
						      			<label htmlFor="visibleBySupplier">Contact visible pour le fournisseur</label>
						      		</span>
						      	</Col>
					      	</div>
					      	:
					      	''
					    }
				    </Row>
				</Col>
			</Row>
  		</Col>
  	)
}

function mapStateToProps(state) {
	const selector = formValueSelector('Team');
	const teamLeaderActivate = selector(state, 'teamLeader.active')

	return {
		teamLeaderActivate
	}
}

function mapDispatchToProps(dispatch, ownProps) {

	return bindActionCreators({ addTechField, removeTechField }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (TechForm);
