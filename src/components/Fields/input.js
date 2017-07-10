import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

const renderInput = ({ children, withoutLabel, placeholder, type, input, meta}) => {
    console.log('METTTT', meta)
    return (
      <FormGroup bsSize="small" controlId={input.name} validationState={meta.touched ? ( meta.error ? 'error' : 'success' ) : ''}>
        {
          !withoutLabel && <ControlLabel>{children}</ControlLabel>
        }
        <FormControl type={type} { ...input } placeholder={placeholder} value={input.value} onChange={input.onChange} onBlur={input.onBlur} />
        <FormControl.Feedback />
        { meta.touched && meta.error && <span>{meta.error}</span>}
      </FormGroup>
    );
}

export default renderInput;
