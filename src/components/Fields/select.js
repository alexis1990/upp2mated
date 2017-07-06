import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

const Select = ({placeholder, type, input, meta}) => {
    return (
    	<FormGroup controlId={input.name} validationState={ meta.touched ? (meta.error ? 'error' : 'success') : ''}>
	        <ControlLabel>Select</ControlLabel>
	        <FormControl {...input} controlId="formControlsSelect" componentClass="select" placeholder="select" value={input.value} onChange={input.onChange}>
				<option value="select">select</option>
				<option value="other">...</option>
			</FormControl>
	        <FormControl.Feedback />
      	</FormGroup>
    );
}

export default Select;