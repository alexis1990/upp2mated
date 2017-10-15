import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

const Select = ({placeholder, type, input, meta , withoutLabel, options }) => {console.log('OPTIONNN', input)
    return (
    	<FormGroup bsSize="small" controlId={input.name} validationState={ meta.touched ? (meta.error ? 'error' : 'success') : ''}>
	        { !withoutLabel && <ControlLabel>Select</ControlLabel> }
	        <FormControl {...input} componentClass="select" placeholder="select" value={input.value} onChange={input.onChange} >
				{ 	options ? options.map(
						(option) => <option value={option.value} >{option.name}</option>
					) : []
				}
			</FormControl>
	        <FormControl.Feedback />
      	</FormGroup>
    );
}

export default Select;