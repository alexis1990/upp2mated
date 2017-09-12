import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter, Link, Route } from 'react-router-dom'
import { Form, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import ProvidersForm from './components/ProvidersForm/index';
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { formValueSelector } from 'redux-form';
import { loadSuppliers } from '../../actions'

class FormContainer extends PureComponent {
	constructor() {
		super();
		this.onSearch = this.onSearch.bind(this);
	}

	onSearch() {
		const { loadSuppliers } = this.props;
		loadSuppliers();
	}

	render(){
		const { error, handleSubmit, onSubmit, previousPage, fields, providersFields, suppliers, contacts } = this.props
		return(
			<Row className="show-grid">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FieldArray name="members" component={ ProvidersForm } fields={providersFields} suppliers={suppliers} contacts={contacts} onSearch={this.onSearch}/>
					<WizardFooter previousPage={previousPage} />
				</Form>
			</Row>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const selector = formValueSelector('Providers')
	return {
		providersFields: state.form.Providers.values.consultationSupplierList,
		suppliers: state.suppliers.suppliers.content,
		contacts: selector(state, 'consultationSupplierList')
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
