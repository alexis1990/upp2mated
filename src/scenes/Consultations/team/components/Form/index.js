import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter, Link, Route } from 'react-router-dom'
import Commercial from './components/Commercial/index';
import TechForm from './components/Tech/index';
import TeamLeaderForm from './components/TeamLeader/index';
import WizardFooter from '../../../../../components/Wizard/components/WizardFooter/index'
import { reduxForm, FieldArray } from 'redux-form'
import { fetchTeamUsers } from '../../actions'
import { bindActionCreators } from 'redux'

class FormContainer extends PureComponent {

	componentDidMount() {
		this.props.fetchTeamUsers();
	}

	render(){
		const { error, handleSubmit, fields, users, onSubmit, previousPage  } = this.props
		return(
			<Row className="show-grid">
				<form onSubmit={handleSubmit(onSubmit)}>
					{/*<FieldArray name="commercial" component={ TeamForm } fields={this.props.commercial} listTeamMembers={users} />*/}
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
		// commercial: state.form.Team.values.commercial,
		tech: state.form.Team.values.tech,
		teamLeaders: state.form.Team.values.teamLeaders,
		users: state.form.Team.teamUsers.users
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchTeamUsers }, dispatch)
}

FormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);

export default FormContainer = reduxForm({
  	form: 'Team',
   	destroyOnUnmount: false,
})(withRouter((FormContainer)))
