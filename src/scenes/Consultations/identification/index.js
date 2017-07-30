import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormContainer from './components/Form/Form.container';
import './styles/identification.css';

class Identification extends PureComponent {
	constructor(props){
		super(props)
	}

	render(){
		console.log('this.props.stepsRFI', this.props.stepsRFI)
		return(
			<FormContainer />
		);
	}
}

function mapStateToProps(state) {
	console.log('staaaaate', state);
	return{
		stepsRFI : state.wizard.stepsRFI
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Identification)