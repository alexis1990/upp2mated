import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapse, Well, Button, Col, Row } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { isModalVisible } from '../../../../components/Modal/actions'
import TeamsList from '../Teams/components/TeamsList'
import UsersList from '../Users/components/UsersList'
import Modal from '../../../../components/Modal/'
import { fetchUsers, selectedTeamAuthorization, selectedUserAuthorization, postRowAuthorization } from '../../actions'
import ListAuthorizations from './components/ListAuthorizations/'
import PanelHeaderTeams from './components/PanelHeaderTeams'
import PanelHeaderUsers from './components/PanelHeaderUsers'
import './styles/style.css'

class Authorizations extends Component {
	constructor() {
		super()
		this.state = {};
	}

	manageTeams(team) {
		const { selectedTeamAuthorization } = this.props;
		console.log('TEAMMM', team)
		selectedTeamAuthorization(team, team.type);
	}

	manageUsers(user) {
		const { selectedUserAuthorization } = this.props;
		selectedUserAuthorization(user, user.type);
	}

	submitRowAuthorization(rowAuthorization) {
		postRowAuthorization(rowAuthorization);
	}

	render() {
		const { teams, users, isVisible, isLoading, tenantTeams, tenantUsers, isModalVisible, directorTeams, directorUsers } = this.props;

		return (
			<Col xs={12} md={12} lg={12} className="authorization">
				<Row>
					<Col xs={6} md={6} lg={6} >
						<h4>
							<strong>Rôle</strong>
						</h4>
					</Col>
					<Col xs={6} md={6} lg={6} >
						<h4>
							<strong>Description</strong>
						</h4>
					</Col>
				</Row>
				<div className="toggle-block">
					<Button xs={12} md={12} lg={12} onClick={() => this.setState({ open: !this.state.open })} className="toggle-button">
						<Col xs={6} md={6} lg={6} >
							Administrateur Tenant
			          	</Col>
						<Col xs={6} md={6} lg={6} >
							Personne ayant tous les droit
			          	</Col>
					</Button>
					<Collapse in={this.state.open}>
						<div>
							<Modal activeNameModal='tenant.teams' isVisible={isVisible} component={<TeamsList teams={teams} type="tenant" checkboxOption manageTeams={(values, type) => this.manageTeams(values, type)} />} />
							<Modal activeNameModal='tenant.users' isVisible={isVisible} component={<UsersList users={tenantUsers} type="tenant" checkboxOption manageMembers={(values, type) => this.manageUsers(values, type)} />} />
							<Well>
								<Row className="panel-header">
									<PanelHeaderTeams nameModal="tenant.teams" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={tenantTeams} name="teams" section="tenant" onSubmit={values => this.submitRowAuthorization(values, "tenant")} />
								</Row>
								<Row className="panel-header">
									<PanelHeaderUsers nameModal="tenant.users" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={tenantUsers} name="users" section="tenant" onSubmit={values => this.submitRowAuthorization(values, "tenant")} />
								</Row>
							</Well>
						</div>
					</Collapse>
				</div>
				<div className="toggle-block">
					<Button xs={12} md={12} lg={12} onClick={() => this.setState({ open: !this.state.open })} className="toggle-button">
						<Col xs={6} md={6} lg={6} >
							Directeur
			          	</Col>
						<Col xs={6} md={6} lg={6} >
							Peut modifier les fournisseurs et voir toutes les consultations
			          	</Col>
					</Button>
					<Collapse in={this.state.open}>
						<div>
							<Modal activeNameModal='director.teams' isVisible={isVisible} component={<TeamsList teams={teams} type="director" checkboxOption manageTeams={(values, type) => this.manageTeams(values, type)} />} />
							<Modal activeNameModal='director.users' isVisible={isVisible} component={<UsersList users={tenantUsers} type="director" checkboxOption manageMembers={(values, type) => this.manageUsers(values, type)} />} />
							<Well>
								<Row className="panel-header">
									<PanelHeaderTeams nameModal="director.teams" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={directorTeams} name="teams" section="director" onSubmit={values => this.submitRowAuthorization(values)} />
								</Row>
								<Row className="panel-header">
									<PanelHeaderUsers nameModal="director.users" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={directorUsers} name="users" section="director" onSubmit={values => this.submitRowAuthorization(values)} />
								</Row>
							</Well>
						</div>
					</Collapse>
				</div>
			</Col>
		)
	}
}

function mapStateToProps(state) {
	return {
		teams: state.form.Administration.teams.data,
		users: state.form.Administration.users.data.content,
		tenantTeams: state.form.Administration.authorization.tenant.values.teams,
		tenantUsers: state.form.Administration.authorization.tenant.values.users,
		directorTeams: state.form.Administration.authorization.director.values.teams,
		directorUsers: state.form.Administration.authorization.director.values.users,
		isVisible: state.modal.mode,
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ fetchUsers, isModalVisible, selectedTeamAuthorization, selectedUserAuthorization }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorizations);