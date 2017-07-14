import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTechField, removeTechField } from '../actions'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col, Row, Glyphicon } from 'react-bootstrap'
import renderInput from '../../../../../../components/Fields/input'
import Select from '../../../../../../components/Fields/select'
import RangeTimePicker from '../../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../../components/SingleTimePicker/index'
import { Field, reduxForm } from 'redux-form'
const { DOM: { input } } = React


const TechForm = ({ handleSubmit, fields, addTechField, removeTechField }) => {
	return (
		<Col xs={12} md={12} lg={12}>
			<h4>Equipe Technique</h4>
			<Row className="show-grid">
			    {fields.map((field, index) =>
					<Col xs={12} md={12} lg={12} key={index}>
						<Row className="show-grid line">
					      	<Col sm={12} md={3} lg={3}>
					      		<Field type="text" placeholder="Prénom nom créateur loggué" withoutLabel name={`tech[${index}].identity`} component={renderInput}>Libellé</Field>
					      	</Col>
					      	<Col sm={12} md={3} lg={3}>
					      		<Field type="text" placeholder="Poste" withoutLabel name={`tech[${index}].job`} component={renderInput}>Poste</Field>
					      	</Col>
					      	<Col sm={12} md={2} lg={2}>
					      		<Field componentClass="select" withoutLabel name={`tech[${index}].nature`} placeholder="nature" component={Select}>Nature</Field>
					      	</Col>
					      	<Col sm={12} md={3} lg={3}>
					      		<span>
						          <Field name={`tech[${index}].employed`} id='employed' component="input" type="checkbox"/>
						        </span>
					      		<span>
					      			<label htmlFor="employed">Contact visible pour le fournisseur</label>
					      		</span>
					      	</Col>
					      	<Col sm={12} md={1} lg={1}>
					      		<Button type="button" bsStyle="action-button font-icon" onClick={() => removeTechField(index)}><Glyphicon glyph="minus"/></Button>
					      	</Col>
					    </Row>
						{/*<FieldArray name={`${member}.hobbies`} component={renderHobbies}/>*/}
					</Col>
			    )}
			    <Col xs={12} md={8} lg={12}>
			      <Button type="button" bsStyle="action-button font-icon" onClick={() => addTechField()}><Glyphicon glyph="plus"/></Button>
			    </Col>
			</Row>
  		</Col>
  	)
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch, ownProps) {
	
	return bindActionCreators({ addTechField, removeTechField }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (TechForm);