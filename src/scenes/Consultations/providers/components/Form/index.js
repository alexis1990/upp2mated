import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter, Link, Route } from 'react-router-dom'
import { Form, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import ProvidersForm from './components/ProvidersForm/index';
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { loadSuppliers } from '../../actions'

class FormContainer extends PureComponent {

	componentDidMount(){
		const { loadSuppliers } = this.props;
		loadSuppliers();
	}

	submit(values) {
		// nextStep(history, stepId);
		const { history } = this.props;
		// console.log('VVVVVV', this.props)
		// console.log('VVVVVV', values)
		// nextStep(history, stepId);
	};

	render(){
		const { error, handleSubmit, onSubmit, previousPage, fields, providersFields, suppliers } = this.props
		return(
			<Row className="show-grid">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FieldArray name="members" component={ ProvidersForm } fields={providersFields} suppliers={suppliers}/>
					<WizardFooter previousPage={previousPage} />
				</Form>
			</Row>
		);
	}
}

function mapStateToProps(state, ownProps) {
	console.log('okokokokok', state)
	return {
		providersFields: state.form.Providers.values.providersReducer,
		suppliers: state.suppliers.suppliers.content
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ loadSuppliers }, dispatch)
}

FormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);

export default FormContainer = reduxForm({
  	form: 'Providers',
   	destroyOnUnmount: false,
})(withRouter((FormContainer)))
