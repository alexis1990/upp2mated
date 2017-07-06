import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

class Input extends Component {

  render () {

    const { children, placeholder, type, input, meta} = this.props;
    console.log('METTTT', meta)
    return (
      <FormGroup controlId={input.name} validationState={meta.touched ? ( meta.error ? 'error' : 'success' ) : ''}>
        <ControlLabel>{children}</ControlLabel>
        <FormControl type={type} { ...input } placeholder={placeholder} value={input.value} onChange={input.onChange} onBlur={input.onBlur} />
        <FormControl.Feedback />
        { meta.touched && meta.error && <span>{meta.error}</span>}
      </FormGroup>
    );
  }
}

export default Input;
