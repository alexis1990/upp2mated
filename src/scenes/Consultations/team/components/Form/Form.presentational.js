import React from 'react'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col } from 'react-bootstrap'
import FieldGroup from '../../../../../components/Fields/index'
import Select from '../../../../../components/Fields/select'
import RangeTimePicker from '../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../components/SingleTimePicker/index'
import { Field, reduxForm } from 'redux-form'

const TeamForm = props => {
	const { handleSubmit } = props
	return (
			<Col xs={12} md={8} lg={6}>
		    	<Field type="text" name="libelle" placeholder="Libellé" component={FieldGroup}>Libellé</Field>
		    	<SingleTimePicker label="Date de clôture" controlId="formControlsDateCloture" />
		    	<Field componentClass="select" name="Nature" placeholder="nature" component={Select}>Nature</Field>	
	  		</Col>
  	)
}

export default TeamForm;