import React, { PureComponent } from 'react'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import moment from 'moment'
import './styles/singledatepicker.css'

class SingleTimePicker extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			startDate : moment(),
			endDate : moment()
		}
	}

	render() {
		const { id, label, name } = this.props;
		console.log('NAME', this.props)
		return (
			<div>
		    	<FormGroup controlId={id}>
	      			<ControlLabel>{label}</ControlLabel>
					<SingleDatePicker
						name={name}
					  date={this.state.date} // momentPropTypes.momentObj or null
					  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
					  focused={this.state.focused} // PropTypes.bool
					  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
					/>
				</FormGroup>
			</div>
		)
	}
}

export default SingleTimePicker;
