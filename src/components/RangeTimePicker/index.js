import React, { PureComponent } from 'react'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
import moment from 'moment' 

class RangeTimePicker extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			startDate : moment(),
			endDate : moment()
		}
	}

	render() {
		return <DateRangePicker
			  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
			  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
			  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
			  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
			  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
			/>
	}
}

export default RangeTimePicker;