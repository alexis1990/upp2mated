import React, { Component } from 'react'
import { FormGroup, FormControl, InputGroup, Button, HelpBlock, ControlLabel, Glyphicon } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import _ from 'lodash'
import './styles/selectTypeahead.css'

class selectTypeahead extends Component {
	render() {
		const { options, placeholder, type, input, meta , withoutLabel, withButton, withGlyph, onClick } = this.props;
		console.log('INPUTTTTTT', options)
		return (
			<InputGroup>
		    	<FormGroup bsSize="small" controlId={input.name}  validationState={ meta.touched ? (meta.error ? 'error' : 'success') : ''}>
			        { !withoutLabel && <ControlLabel>Select</ControlLabel> }
			        <FormControl
								{...input}
								// selected={options.slice(0, 1)}
								bodyContainer
								className="input-typeahead"
								componentClass={Typeahead}
								labelKey={option => `${option.name} ${option.id}`}
								options={options}
								clearButton
								placeholder={placeholder}
								>
								</FormControl>
			        <FormControl.Feedback />
		      	</FormGroup>
		  		{ 	withButton &&
			  		<InputGroup.Button>
			        	<Button onClick={onClick} bsStyle="action-button small-text" type="button">
			        		{ withGlyph && <Glyphicon className="small-glyph" glyph={withGlyph} />}
			        	</Button>
			      	</InputGroup.Button>
			    }
		   </InputGroup>
		)
	}
}
// const selectTypeahead = ({ options, placeholder, type, input, meta , withoutLabel, withButton, withGlyph, onClick }) => (console.log('OPPPPPPPP', input),
// 	<InputGroup>
//     	<FormGroup bsSize="small" controlId={input.name}  validationState={ meta.touched ? (meta.error ? 'error' : 'success') : ''}>
// 	        { !withoutLabel && <ControlLabel>Select</ControlLabel> }
// 	        <FormControl {...input} submitFormOnEnter allowNew bodyContainer className="input-typeahead" componentClass={Typeahead} labelKey="name" options={options} placeholder={placeholder} value={input.value} onChange={input.onChange}></FormControl>
// 	        <FormControl.Feedback />
//       	</FormGroup>
//   		{ 	withButton &&
// 	  		<InputGroup.Button>
// 	        	<Button onClick={onClick} bsStyle="action-button small-text" type="button">
// 	        		{ withGlyph && <Glyphicon className="small-glyph" glyph={withGlyph} />}
// 	        	</Button>
// 	      	</InputGroup.Button>
// 	    }
//     </InputGroup>
// );
//
export default selectTypeahead;
