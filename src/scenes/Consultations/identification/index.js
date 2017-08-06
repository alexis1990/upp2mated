import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux'
import { withRouter, Link, Route } from 'react-router-dom'
import validate from './components/Form/validate'
import { connect } from 'react-redux'
import { submitFormToAPI } from './actions'
import FormContainer from './components/Form/Form.container';
import WizardFooter from '../../../components/Wizard/components/WizardFooter/index'
import { nextPage } from '../../../components/Wizard/actions'
import { reduxForm, Form } from 'redux-form'
import './styles/identification.css';

class Identification extends PureComponent {
	constructor(props){
		super(props)
	}

	submit (values){
		const {nextPage, match, history, submitFormToAPI} = this.props
		console.log('kokokookook', submitFormToAPI)
		submitFormToAPI(values);
    	// nextPage(history, '/consultations/', match.params.stepId);
  	}

	render(){
		const { error, previousPage } = this.props
		return(
			<FormContainer onSubmit={this.submit.bind(this)} previousPage={previousPage} />
		);
	}
}

function mapStateToProps(state) {
	return{
		stepsRFI : state.wizard.stepsRFI,
		initialValues: {
			consultationType: 'RFQ'
		}
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({nextPage, submitFormToAPI}, dispatch);
}


Identification = connect(
    mapStateToProps,
    mapDispatchToProps
)(Identification);

export default withRouter(Identification);
