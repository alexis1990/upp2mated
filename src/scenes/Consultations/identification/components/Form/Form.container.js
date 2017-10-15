import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter, Link, Route } from 'react-router-dom'
import IdentificationForm from './Form.presentational';
import validate from './validate'
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { reduxForm } from 'redux-form'
import { Form } from 'redux-form'
import './styles/form.css';

class FormContainer extends PureComponent {

	render(){
		const { handleSubmit, onSubmit, previousPage } = this.props;
		return(
			<Row className="show-grid">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<IdentificationForm />
					<WizardFooter previousPage={previousPage}/>
				</Form>
			</Row>
		);
	}
}

function mapStateToProps(state) {
	return{
		stepsRFI : state.wizard.stepsRFI,
		initialValues: {
			consultationType: 'RFQ',
			currency: 'EUR'
		}
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({}, dispatch);
}


FormContainer = connect(
    mapStateToProps,
)(FormContainer);

export default FormContainer = reduxForm({
  	form: 'Identification',
  	destroyOnUnmount: false,
   	validate
})(withRouter((FormContainer)))