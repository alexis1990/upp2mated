import React, { Component } from 'react'
import { withRouter, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submit } from 'redux-form'
import { nextPage, submitFormToAPI } from './actions'
import WizardHeader from './components/WizardHeader'
import WizardFooter from './components/WizardFooter'
import { getFormValues } from 'redux-form';
import './styles/wizard.css'

class Wizard extends Component {
  constructor(props) {
    super(props)
		console.log('PROPPPP', props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }
  nextPage(e) {
		const { match, history, submitFormToAPI } = this.props;
		// this.props.nextPage(match.params.stepId);
    submitFormToAPI(this.props.formValues)
		history.push((parseInt(match.params.stepId) + 1).toString());
  }

  previousPage() {
    const { match, history } = this.props;
    console.log('okokokokokok');
    history.push((parseInt(match.params.stepId) - 1).toString());
  }

  render() {
    const {onSubmit, steps, match, stepId} = this.props

    return (
      <div>
					<WizardHeader actualStep={match.params.stepId} steps={steps} />
					{React.cloneElement(
				   	steps[stepId - 1].component,
				    { onSubmit: this.nextPage, previousPage: this.previousPage }
					)}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const formName = state.wizard.stepsRFI[state.wizard.actualStep - 1 ].title;
	return {
    formValues : getFormValues(formName)(state),
		actualStep: state.wizard.actualStep
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ nextPage, submitFormToAPI }, dispatch);
}


export default withRouter(connect (mapStateToProps, mapDispatchToProps) (Wizard));
