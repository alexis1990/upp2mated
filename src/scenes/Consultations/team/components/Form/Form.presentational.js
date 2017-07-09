import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addField, removeField } from './actions'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col, Row } from 'react-bootstrap'
import renderInput from '../../../../../components/Fields/input'
import Select from '../../../../../components/Fields/select'
import RangeTimePicker from '../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../components/SingleTimePicker/index'
import { Field, reduxForm } from 'redux-form'
import '../styles/style.css'
const { DOM: { input } } = React


const TeamForm = ({ handleSubmit, fields, addField, removeField }) => {
	return (
		<Col xs={12} md={8} lg={12} className="team">
			<Row className="show-grid">
			    {fields.map((field, index) =>
					<Col xs={12} md={8} lg={12} key={index}>
						<Row className="show-grid line">
					      	<Col sm={4} md={3} lg={3}>
					      		<Field type="text" placeholder="Prénom nom créateur loggué" withoutLabel name={`Team[${index}].identity`} component={renderInput}>Libellé</Field>
					      	</Col>
					      	<Col sm={4} md={1} lg={3}>
					      		<Field type="text" placeholder="Poste" withoutLabel name={`Team[${index}].job`} component={renderInput}>Poste</Field>
					      	</Col>
					      	<Col sm={4} md={2} lg={2}>
					      		<Field componentClass="select" withoutLabel name={`Team[${index}].nature`} placeholder="nature" component={Select}>Nature</Field>
					      	</Col>
					      	<Col sm={4} md={3} lg={3}>
					      		<span>
						          <Field name={`commercial[${index}].employed`} id='employed' component="input" type="checkbox"/>
						        </span>
					      		<span>
					      			<label htmlFor="employed">Contact visible pour le fournisseur</label>
					      		</span>
					      	</Col>
					      	<Col sm={2} md={1} lg={1}>
					      		<Button type="button" onClick={() => removeField(index)}>-</Button>
					      	</Col>
					    </Row>
						{/*<FieldArray name={`${member}.hobbies`} component={renderHobbies}/>*/}
					</Col>
			    )}
			    <Col xs={12} md={8} lg={12}>
			      <Button type="button" onClick={() => addField()}>+</Button>
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
	
	return bindActionCreators({ addField, removeField }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (TeamForm);