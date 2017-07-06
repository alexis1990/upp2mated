import React from 'react'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col } from 'react-bootstrap'
import Input from '../../../../../components/Fields/input'
import Select from '../../../../../components/Fields/select'
import RangeTimePicker from '../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../components/SingleTimePicker/index'
import { Field, reduxForm } from 'redux-form'

const TeamForm = props => {
	const { handleSubmit } = props
	return (
			<Col xs={12} md={8} lg={6}>
		    	<Field type="text" name="aa" placeholder="Libellé" component={Input}>Libellé</Field>
		    	<SingleTimePicker label="Date de clôture" controlId="deezd" />
		    	<Field componentClass="select" name="aaddd" placeholder="nature" component={Select} >Nature</Field>	
	  		</Col>
  	)
}

export default TeamForm;