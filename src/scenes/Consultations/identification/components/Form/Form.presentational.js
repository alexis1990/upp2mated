import React from 'react'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col } from 'react-bootstrap'
import FieldGroup from '../../../../../components/Fields/index'
import Select from '../../../../../components/Fields/select'
import RangeTimePicker from '../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../components/SingleTimePicker/index'
import { Field, reduxForm } from 'redux-form'

const IdentificationForm = props => {
	const { handleSubmit } = props
	return (
			<Col xs={12} md={8} lg={6}>
		    	<Field type="text" name="libelle" placeholder="Libellé" component={FieldGroup}>Libellé</Field>
		    	<SingleTimePicker label="Date de clôture" controlId="formControlsDateCloture" />
		    	<Field componentClass="select" name="Nature" placeholder="nature" component={Select}>Nature</Field>	
		    {/*<FieldGroup
		      id="formControlsLibelle"
		      type="email"
		      label="Libellé"
		      placeholder="Libellé"
		    />

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