import React, {Component} from 'react'
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon} from 'react-bootstrap'
import {AsyncTypeahead} from 'react-bootstrap-typeahead'
import './styles/selectTypeahead.css'

class asyncTypeahead extends Component {
	render() {
		const { options, placeholder, type, input, meta , withoutLabel, withButton, withGlyph, onClick, onSearch, selected } = this.props;
		return (
			<div className="typeahead">
		    	<FormGroup bsSize="small" controlId={input.name}  validationState={ meta.touched ? (meta.error ? 'error' : 'success') : ''}>
			        { !withoutLabel && <ControlLabel>Select</ControlLabel> }
			        <FormControl
								{...input}
								bodyContainer
								className="input-typeahead"
								componentClass={AsyncTypeahead}
								labelKey={option => `${option.name} ${option.id}`}
								onBlur = {option => {}}
								options={options}
								clearButton
								placeholder={placeholder}
								selected={ selected && options.slice(0, 1)}
								onSearch={onSearch}
								>
					</FormControl>
					{ 	
		  			withButton &&
			        	<Button onClick={onClick} bsStyle="action-button small-text" type="button">
			        		{ withGlyph && <Glyphicon className="small-glyph" glyph={withGlyph} />}
			        	</Button>
			    	}
		      	</FormGroup>
		   </div>
		)
	}
}

export default asyncTypeahead;
