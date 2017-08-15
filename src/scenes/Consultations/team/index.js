import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { nextPage } from '../../../components/Wizard/actions'
import { connect } from 'react-redux'
import FormContainer from './components/Form/index';
import { submitStep2 } from './actions'
import './styles/team.css'

class Team extends PureComponent {
	constructor(props){
		super(props);
	}

	submit (values){
		const {nextPage, match, history, submitStep2} = this.props
		const stepId = match.params.stepId;
		submitStep2(values, nextPage, history, stepId);
  	}

	render(){
		const { previousPage } = this.props

		return(
			<FormContainer onSubmit={this.submit.bind(this)} previousPage={previousPage} />
		);
	}
}

function mapStateToProps(state) {
	return{
		stepsRFI : state.wizard.stepsRFI
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ nextPage, submitStep2 }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter((Team)))
