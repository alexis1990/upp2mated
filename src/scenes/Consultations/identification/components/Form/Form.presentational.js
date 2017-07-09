import React from 'react'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col } from 'react-bootstrap'
import renderInput from '../../../../../components/Fields/input'
import Select from '../../../../../components/Fields/select'
import RangeTimePicker from '../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../components/SingleTimePicker/index'
import { Field, reduxForm } from 'redux-form'

const IdentificationForm = props => {
	const { handleSubmit } = props
	return (
			<Col xs={12} md={8} lg={6}>
		    	<Field type="number" name="consultationNumber" placeholder="Numéro de la consultation"  component={renderInput}>Numéro de la consultation</Field>
		    	<Field type="text" name="wording" placeholder="Libellé"  component={renderInput}>Libellé</Field>
		    	<SingleTimePicker label="Date de clôture" controlId="formControlsDateCloture" />
		    	<Field componentClass="select" name="nature" placeholder="nature" component={Select}>Nature</Field>
		    	<Field componentClass="select" name="currency" placeholder="Devise" component={Select}>Devise</Field>	
		    {/*
		    <SingleTimePicker label="Date de clôture" controlId="formControlsDateCloture" />

		    <FormGroup controlId="formControlsNature">
		      <ControlLabel>Nature</ControlLabel>
		      <FormControl componentClass="select" placeholder="select">
		        <option value="select">Commercial</option>
		        <option value="other">Technique</option>
		      </FormControl>
		    </FormGroup>

		    <FormGroup controlId="formControlsDevise">
		      <ControlLabel>Devise</ControlLabel>
		      <FormControl componentClass="select" placeholder="select">
		        <option value="select">EUR</option>
		        <option value="other">GBP</option>
		      </FormControl>
		    </FormGroup>*/}
	  		</Col>
  	)
}

// IdentificationForm = reduxForm({
//   // a unique name for the form
//   form: 'identification' 
// })(IdentificationForm)

export default IdentificationForm;