import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
import './styles/select.css'


const Select = ({placeholder, type, input, meta , withoutLabel, options }) => {console.log('OPTIONNN', input)
    return (
    	<FormGroup bsSize="lg" controlId={input.name} validationState={ meta.touched ? (meta.error ? 'error' : 'success') : ''}>
	        {/*{ !withoutLabel && <ControlLabel>Select</ControlLabel> }*/}
	        <FormControl {...input} componentClass="select" placeholder="select" value={input.value} onChange={input.onChange} >
				<option value="-1" disabled>{placeholder}</option>
				{ 	options ? options.map(
						(option, i) => <option value={option.value} key={i}>{option.name}</option>
					) : []
				}
			</FormControl>
	        <FormControl.Feedback />
      	</FormGroup>
    );
}

export default Select;