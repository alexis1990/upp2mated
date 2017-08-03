import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux'
import { withRouter, Link, Route } from 'react-router-dom'
import validate from './components/Form/validate'
import { connect } from 'react-redux'
import FormContainer from './components/Form/Form.container';
import WizardFooter from '../../../components/Wizard/components/WizardFooter/index'
import { reduxForm, Form } from 'redux-form'
import './styles/identification.css';

class Identification extends PureComponent {
	constructor(props){
		super(props)
	}

	render(){
		const { error, handleSubmit, previousPage } = this.props
		return(
			<Form model="user" onSubmit={handleSubmit}>
				<FormContainer />
				<WizardFooter previousPage={previousPage}/>
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
