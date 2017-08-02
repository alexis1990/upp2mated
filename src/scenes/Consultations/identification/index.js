import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux'
import { withRouter, Link, Route } from 'react-router-dom'
import validate from './components/Form/validate'
import { connect } from 'react-redux'
import FormContainer from './components/Form/Form.container';
import { reduxForm, Form } from 'redux-form'
import './styles/identification.css';

class Identification extends PureComponent {
	constructor(props){
		super(props)
	}

	render(){
		console.log('this.props.stepsRFI', this.props.onSubmit)
		const { error, handleSubmit } = this.props
		return(
			<Form model="user" onSubmit={handleSubmit}>
				<FormContainer />
			</Form>
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

Identification = connect(
    mapStateToProps,
    mapDispatchToProps
)(Identification);

export default Identification = reduxForm({
  	form: 'Identification',
   	destroyOnUnmount: false,
   	validate
})(withRouter((Identification)))

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Identification)
