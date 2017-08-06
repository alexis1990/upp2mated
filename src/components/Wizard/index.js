import React, { Component } from 'react'
import { withRouter, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submit } from 'redux-form'
import WizardHeader from './components/WizardHeader'
import WizardFooter from './components/WizardFooter'
import { getFormValues } from 'redux-form';
import './styles/wizard.css'

class Wizard extends Component {
  constructor(props) {
    super(props)
    this.previousPage = this.previousPage.bind(this)
  }

  previousPage() {
    const { match, history } = this.props;
    history.push((parseInt(match.params.stepId) - 1).toString());
  }

  render() {
    const {onSubmit, steps, match, stepId} = this.props

    return (
      <div>
					<WizardHeader actualStep={match.params.stepId} steps={steps} />
					{React.cloneElement(
				   	steps[stepId - 1].component,
				    { onSubmit: onSubmit, previousPage: this.previousPage }
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
	return bindActionCreators({}, dispatch);
}


export default withRouter(connect (mapStateToProps, mapDispatchToProps) (Wizard));
