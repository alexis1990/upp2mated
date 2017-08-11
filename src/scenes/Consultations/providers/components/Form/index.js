import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter, Link, Route } from 'react-router-dom'
import ProvidersForm from './components/ProvidersForm/ProvidersForm.presentational';
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { reduxForm, FieldArray } from 'redux-form'
import { Form } from 'redux-form'

class FormContainer extends PureComponent {

	submit(values) {
		// nextStep(history, stepId);
		const { history } = this.props;
		// console.log('VVVVVV', this.props)
		// console.log('VVVVVV', values)
		// nextStep(history, stepId);

	};

	render(){
		const { error, handleSubmit, onSubmit, previousPage, fields } = this.props
		return(
			<Row className="show-grid">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FieldArray name="members" component={ ProvidersForm } fields={this.props.providersFields}/>
					<WizardFooter previousPage={previousPage} />
				</Form>
			</Row>
		);
	}
}

function mapStateToProps(state, ownProps) {
	console.log('STTTTTTATE', state)
	return {
		providersFields: state.form.Providers.values.providersReducer
	};
}

FormContainer = connect(
    mapStateToProps,
    // mapDispatchToProps
)(FormContainer);

export default FormContainer = reduxForm({
  	form: 'Providers',
   	destroyOnUnmount: false,
})(withRouter((FormContainer)))
