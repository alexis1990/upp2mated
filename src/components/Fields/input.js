import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
import './styles/input.css'

const renderInput = ({ label, withoutLabel, placeholder, type, input, meta}) => {
    console.log('METTTT', input)
    return (
      <FormGroup bsSize="lg" controlId={input.name} validationState={meta.touched ? ( meta.error ? 'error' : 'success' ) : ''}>
        {/* {
          !withoutLabel && <ControlLabel>{label}</ControlLabel>
        } */}
        <FormControl type={type} { ...input } placeholder={placeholder} value={input.value} onChange={input.onChange} onBlur={input.onBlur} />
        <span></span>
        <FormControl.Feedback />
        { meta.touched && meta.error && <span>{meta.error}</span>}
      </FormGroup>
    );
}

export default renderInput;
