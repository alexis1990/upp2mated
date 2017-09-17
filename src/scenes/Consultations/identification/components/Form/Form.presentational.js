import React from 'react'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col } from 'react-bootstrap'
import renderInput from '../../../../../components/Fields/input'
import Select from '../../../../../components/Fields/select'
import RangeTimePicker from '../../../../../components/RangeTimePicker/index'
import DateRangePickerWrapper from '../../../../../components/RangeTimePicker/index'
import { Field, reduxForm } from 'redux-form'

const IdentificationForm = props => {
	return (
		<Col xs={12} md={8} lg={6} className="Identification">
			<Field type="text" name="consultationType" placeholder="Type" component={renderInput} disabled>Type</Field>
	    	{/*<Field type="number" name="consultationNumber" placeholder="Numéro de la consultation"  component={renderInput}>Numéro de la consultation</Field>*/}
	    	<Field type="text" name="label" placeholder="Nom"  component={renderInput}>Libellé</Field>
	    	<DateRangePickerWrapper name="date" label="Date" controlId="formControlsDateCloture" />
	    	{/*<Field componentClass="select" name="consultationType" placeholder="nature" component={Select}>Nature</Field>*/}
	    	{/* <Field componentClass="select" name="currency" placeholder="Devise" component={Select}>Devise</Field> */}
  		</Col>
  	)
}

export default IdentificationForm;
