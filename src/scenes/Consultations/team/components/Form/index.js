import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter, Link, Route } from 'react-router-dom'
import TeamForm from './components/TeamForm.presentational';
import TechForm from './components/TechForm.presentational';
import TeamLeaderForm from './components/TeamLeaderForm.presentational';
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { reduxForm, FieldArray } from 'redux-form'
import { fetchTeamUsers, submitStep2 } from '../../actions'
import { bindActionCreators } from 'redux'

class FormContainer extends PureComponent {

	submit(values) {
		// nextStep(history, stepId);
		const { history } = this.props;
		// console.log('VVVVVV', this.props)
		console.log('VVVVVV', values)
		this.props.submitStep2(values);
		// nextStep(history, stepId);
	};

	componentDidMount() {
		this.props.fetchTeamUsers();
	}

	render(){
		const { error, handleSubmit, fields, users } = this.props
		return(
			<Row className="show-grid">
				<form onSubmit={handleSubmit(this.submit.bind(this))}>
					<FieldArray name="commercial" component={ TeamForm } fields={this.props.commercial} listTeamMembers={users} />
					<FieldArray name="technical" component={ TechForm } fields={this.props.tech} listTeamMembers={users} />
					<FieldArray name="teamLeader" component={ TeamLeaderForm } listTeamMembers={users} />
					<WizardFooter />
				</form>
			</Row>
		);
	}
}

function mapStateToProps(state, ownProps) {
	console.log('TEAMMMMMMMM', state.form.Team)
	return {
		commercial: state.form.Team.values.commercial,
		tech: state.form.Team.values.tech,
		users: state.form.Team.values.teamUsers.users
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchTeamUsers, submitStep2 }, dispatch)
}

FormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);

export default FormContainer = reduxForm({
  	form: 'Team',
   	destroyOnUnmount: false,
})(withRouter((FormContainer)))
