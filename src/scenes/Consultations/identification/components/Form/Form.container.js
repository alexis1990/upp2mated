import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import IdentificationForm from './Form.presentational';
import './styles/form.css';
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { reduxForm } from 'redux-form'

class FormContainer extends PureComponent {

	submit(values) {
		// nextStep(history, stepId);
		console.log('VVVVVV', values)
	};

	render(){
		const { error, handleSubmit } = this.props
		return(
			<Grid className="form" fluid={true}>
				<Row className="show-grid">
					<Col xs={12} md={12} lg={12} className="consultation">
						<form onSubmit={handleSubmit(this.submit)}>
							<IdentificationForm />
							<WizardFooter />
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default reduxForm({
  form: 'identification'
})(FormContainer);