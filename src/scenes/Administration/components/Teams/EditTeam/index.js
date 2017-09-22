import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, Button, Table, Glyphicon, ButtonGroup } from 'react-bootstrap'
import { Field, Form, reduxForm } from 'redux-form'
import { withRouter, Link, Route } from 'react-router-dom'
import renderInput from '../../../../../components/Fields/input'
import TeamCreationForm from '../components/TeamCreationForm/'
import TeamMembers from '../components/TeamMembers/'
import { bindActionCreators } from 'redux'
import { fetchTeam } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import { connect } from 'react-redux'

class EditTeam extends Component {

	componentWillMount(){
		const { fetchTeam, match } = this.props;
		fetchTeam(match.params.id);
	}

	postTeam(values) {
		console.log('VALUESSS', values)
	}

	render(){
		const { team, isLoading } =  this.props;
		return(
			<div className="create-team">
	        	<Col xs={6} md={6} lg={6}>
					<h3> Equipe { team.name } </h3>
					<Form onSubmit={this.postTeam()}>
						<TeamCreationForm />
					</Form>
				</Col>
				<Col xs={6} md={6} lg={6} className="members list">
					{	isLoading ?
						<Spinner />
					:
					<div>
						<TeamMembers teamMembers={ team.teamMembers } />				
					</div>
					}
				</Col>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log('STATTTE', state)
	return {
		team: state.form.Administration.team.data,
		isLoading: state.form.Administration.team.isLoading
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ fetchTeam }, dispatch);
}

EditTeam = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTeam);

export default EditTeam = reduxForm({
  	form: 'Administration.editTeam'
})(withRouter((EditTeam)))