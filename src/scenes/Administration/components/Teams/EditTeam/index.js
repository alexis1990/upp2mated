import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, Button, Table, Glyphicon, ButtonGroup } from 'react-bootstrap'
import { Field, Form, reduxForm } from 'redux-form'
import { withRouter, Link, Route } from 'react-router-dom'
import renderInput from '../../../../../components/Fields/input'
import TeamCreationForm from '../components/TeamCreationForm/'
import TeamMembers from '../components/TeamMembers/'
import UsersList from '../../Users/components/UsersList'
import Modal from '../../../../../components/Modal/'
import { isModalVisible } from '../../../../../components/Modal/actions'
import { bindActionCreators } from 'redux'
import { fetchTeam, selectedMemberEdition, editTeam } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import { connect } from 'react-redux'

class EditTeam extends Component {
	constructor() {
		super();
		this.editTeam = this.editTeam.bind(this);
	}

	componentWillMount(){
		const { fetchTeam, match } = this.props;
		fetchTeam(match.params.id);
	}

	editTeam(e) {
		const { team, history, editTeam } = this.props;
		e.preventDefault();
		editTeam(team, history)
	}

	manageMembers(member){
		const { selectedMemberEdition } = this.props;
		selectedMemberEdition(member);	
	}

	render(){
		const { team, isLoading, isModalVisible, isVisible } =  this.props;
		return(
			<div className="create-team">
				<Modal isVisible={ isVisible } component={ <UsersList checkboxOption users={team.teamMembers} manageMembers={this.manageMembers.bind(this)} /> } />
	        	<Form onSubmit={this.editTeam}>
					<Col xs={6} md={6} lg={6}>
						<h3> Equipe { team.name } </h3>					
						<TeamCreationForm />
					</Col>
					<Col xs={6} md={6} lg={6} className="members list">
						{	isLoading ?
							<Spinner />
						:
						<div>
							<Col xs={9} md={9} lg={9}>
									<h4> Membres </h4>
							</Col>
							<Col xs={3} md={3} lg={3} className="panel-head">
								<Button onClick={() => isModalVisible(true)}>
									<Glyphicon glyph="plus"/>Gérer les membres
								</Button>
							</Col>
							<Col xs={12} md={12} lg={12} className="panel-head">
								<TeamMembers teamMembers={ team.teamMembers } />
							</Col>			
						</div>
						}
					</Col>
					<Button type="submit" className="pull-right">
						Submit
					</Button>
				</Form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		team: state.form.Administration.editTeam.values,
		isLoading: state.form.Administration.editTeam.isLoading,
		isVisible: state.modal.mode
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ 
		fetchTeam, 
		isModalVisible, 
		selectedMemberEdition, 
		editTeam 
	}, dispatch);
}

EditTeam = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTeam);

export default EditTeam = reduxForm({
	form: 'Administration.editTeam',
	initialValues: {
		teamMembers: []
	},
	destroyOnUnmount: false
})(withRouter((EditTeam)))