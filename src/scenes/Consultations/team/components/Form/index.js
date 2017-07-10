import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter, Link, Route } from 'react-router-dom'
import TeamForm from './components/TeamForm.presentational';
import TechForm from './components/TechForm.presentational';
import TeamLeaderForm from './components/TeamLeaderForm.presentational';
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { reduxForm, FieldArray } from 'redux-form'

class FormContainer extends PureComponent {

	submit(values) {
		// nextStep(history, stepId);
		const { history } = this.props;
		// console.log('VVVVVV', this.props)
		// console.log('VVVVVV', values)
		// nextStep(history, stepId);

	};

	render(){
		const { error, handleSubmit, fields } = this.props
		return(
			<Grid className="form" fluid={true}>
				<Row className="show-grid">
					<Col xs={12} md={12} lg={12} className="consultation">
						<form onSubmit={handleSubmit(this.submit.bind(this))}>
							<FieldArray name="members" component={ TeamForm } fields={this.props.team}/>
							<FieldArray name="technical" component={ TechForm } fields={this.props.tech}/>
							<FieldArray name="technical" component={ TeamLeaderForm } />
							<WizardFooter />
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		team: state.form.Team.values.teamForm,
		tech: state.form.Team.values.techForm
	};
}

FormContainer = connect(
    mapStateToProps,
    // mapDispatchToProps
)(FormContainer);

export default FormContainer = reduxForm({
  	form: 'Team',
   	destroyOnUnmount: false,
})(withRouter((FormContainer)))