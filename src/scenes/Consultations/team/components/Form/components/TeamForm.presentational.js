import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTeamField, removeTeamField } from '../../../actions'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col, Row, Glyphicon } from 'react-bootstrap'
import renderInput from '../../../../../../components/Fields/input'
import Select from '../../../../../../components/Fields/select'
import RangeTimePicker from '../../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../../components/SingleTimePicker/index'
import SelectTypeahead from '../../../../../../components/Fields/selectTypeahead'
import { Field, reduxForm } from 'redux-form'
const { DOM: { input } } = React

const TeamForm = ({ handleSubmit, fields, addTeamField, removeTeamField, listTeamMembers }) => {
	return (
		<Col xs={12} md={12} lg={12}>
			<h4>Equipe Commercial</h4>
			<Row className="show-grid">
			    {fields.map((field, index) =>
					<Col xs={12} md={12} lg={12} key={index}>
						<Row className="show-grid line">
					      	<Col sm={12} md={3} lg={3}>
										<Field type="select" withButton withGlyph="plus" options={listTeamMembers}  placeholder="Chercher fournisseur par nom" withoutLabel name={`commercial[${index}].user`} component={SelectTypeahead}>Chercher fournisseur par nom</Field>
					      		{/* <Field type="text" placeholder="Prénom nom créateur loggué" withoutLabel name={`team[${index}].identity`} component={renderInput}>Libellé</Field> */}
					      	</Col>
					      	<Col sm={12} md={3} lg={3}>
					      		<Field type="text" placeholder="Poste" withoutLabel name={`commercial[${index}].job`} component={renderInput}>Poste</Field>
					      	</Col>
					      	<Col sm={12} md={2} lg={2}>
					      		<Field componentClass="select" withoutLabel name={`commercial[${index}].permission`} placeholder="nature" component={Select}>Nature</Field>
					      	</Col>
					      	<Col sm={12} md={3} lg={3}>
					      		<span>
						          <Field name={`commercial[${index}].visibleBySupplier`} id='visibleBySupplier' component="input" type="checkbox"/>
						        </span>
					      		<span>
					      			<label htmlFor="visibleBySupplier">Contact visible pour le fournisseur</label>
					      		</span>
					      	</Col>
					      	<Col sm={12} md={1} lg={1}>
					      		<Button type="button" bsStyle="action-button font-icon" onClick={() => removeTeamField(index)}><Glyphicon glyph="minus"/></Button>
					      	</Col>
					    </Row>
						{/*<FieldArray name={`${member}.hobbies`} component={renderHobbies}/>*/}
					</Col>
			    )}
			    <Col xs={12} md={8} lg={12}>
			      <Button type="button" bsStyle="action-button font-icon" onClick={() => addTeamField()}><Glyphicon glyph="plus"/></Button>
			    </Col>
			</Row>
  		</Col>
  	)
}

function mapStateToProps(state) {
	console.log('ssssss', state)
	return {};
}

function mapDispatchToProps(dispatch, ownProps) {

	return bindActionCreators({ addTeamField, removeTeamField }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (TeamForm);
