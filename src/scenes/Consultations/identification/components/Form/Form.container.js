import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter, Link, Route } from 'react-router-dom'
import IdentificationForm from './Form.presentational';
import validate from './validate'
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { reduxForm } from 'redux-form'
import './styles/form.css';

class FormContainer extends PureComponent {

	submit(values) {
		// nextStep(history, stepId);
		const { history } = this.props;
		// console.log('VVVVVV', this.props)
		// console.log('VVVVVV', values)
		// nextStep(history, stepId);

	};

	render(){
		const { error, handleSubmit } = this.props
		return(
			<Grid className="form" fluid={true}>
				<Row className="show-grid">
					<Col xs={12} md={12} lg={12} className="consultation">
						<form onSubmit={handleSubmit(this.submit.bind(this))}>
							<IdentificationForm />
							<WizardFooter />
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

function mapStateToProps(state, ownProps) {
	// console.log('STTTTT', state, ownProps.match);
	return {};
}

FormContainer = connect(
    mapStateToProps,
    // mapDispatchToProps
)(FormContainer);

export default FormContainer = reduxForm({
  	form: 'Identification',
   	destroyOnUnmount: false,
   	validate
})(withRouter((FormContainer)))

// You have to connect() to any reducers that you wish to connect to yourself
// FormContainer = connect(
//   (state, ownProps) => (console.log('STATEEEE', state, ownProps.match), {
//     // initialValues: state.account.data // pull initial values from account reducer
//   })
//   // { load: loadAccount }               // bind account loading action creator
// )(FormContainer)

// export default withRouter(reduxForm({
//   form: 'identification'
// })(FormContainer));