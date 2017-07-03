import React from 'react'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col } from 'react-bootstrap'
import FieldGroup from '../../../../../components/Fields/index'
import RangeTimePicker from '../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../components/SingleTimePicker/index'

const Form = () => (
	<Col xs={12} md={8} lg={6}>
	    <FieldGroup
	      id="formControlsNumeroConsultation"
	      type="text"
	      label="Numéro de la consultation"
	      placeholder="Numéro de la consultation"
	    />
	    <FieldGroup
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
	    </FormGroup>
  	</Col>
)


export default Form;