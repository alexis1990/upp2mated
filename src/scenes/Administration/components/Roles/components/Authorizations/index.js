import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapse, Well, Button, Col, Row } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { isModalVisible } from '../../../../../../components/Modal/actions'
import TeamsList from '../../../Teams/components/TeamsList'
import UsersList from '../../../Users/components/UsersList'
import Modal from '../../../../../../components/Modal/'
import { fetchUsers, fetchTeams } from '../../../../actions'
import { selectedTeamAuthorization, selectedUserAuthorization, getResponsibilities, getScopes, resetAuthorizationsList } from '../../actions'
import ListAuthorizations from './components/ListAuthorizations/'
import PanelHeaderTeams from './components/PanelHeaderTeams'
import PanelHeaderUsers from './components/PanelHeaderUsers'
import CollapseHeader from './components/CollapseHeader'
import './styles/style.css'

class Authorizations extends Component {
	constructor() {
		super()
		this.state = {
			open: false,
			id: 1
		};
	}

	componentWillMount() {
		const { getResponsibilities, getScopes, fetchTeams } = this.props;
		fetchTeams();
		getResponsibilities();
		getScopes();
	}

    componentWillUnmount() {
		const { resetAuthorizationsList } = this.props;
		resetAuthorizationsList();
    }


	manageTeams(team) {
		const { selectedTeamAuthorization } = this.props;
		selectedTeamAuthorization(team, team.type);
	}

	manageUsers(user) {
		const { selectedUserAuthorization } = this.props;
		selectedUserAuthorization(user, user.type);
	}

	render() {
		const { teamsList, usersList, isVisible, isLoading, tenantTeams, tenantUsers, isModalVisible, directorTeams, directorUsers, buyerTeams, buyerUsers, tenantRole } = this.props;

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
					<Button xs={12} md={12} lg={12} onClick={() => this.setState({ open: true, id: 1 })} className="toggle-button">
						<CollapseHeader form="Administration.authorization.tenant.role" role={tenantRole} />
					</Button>
					<Collapse in={this.state.open && this.state.id == 1}>
						<div>
							<Modal activeNameModal='tenant.teams' isVisible={isVisible} component={<TeamsList teams={teamsList} type="tenant" checkboxOption manageTeams={(values, type) => this.manageTeams(values, type)} />} />
							<Modal activeNameModal='tenant.users' isVisible={isVisible} component={<UsersList users={tenantUsers} type="tenant" checkboxOption manageMembers={(values, type) => this.manageUsers(values, type)} />} />
							<Well>
								<Row className="panel-header">
									<PanelHeaderTeams nameModal="tenant.teams" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={tenantTeams} name="team" form="Administration.authorization.tenant.teams" role={tenantRole} onSubmit={this.submitRowAuthorization} />
								</Row>
								<Row className="panel-header">
									<PanelHeaderUsers nameModal="tenant.users" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={tenantUsers} name="user" form="Administration.authorization.tenant.users" role={tenantRole} onSubmit={this.submitRowAuthorization} />
								</Row>
							</Well>
						</div>
					</Collapse>
				</div>
				<div className="toggle-block">
					{/* <Button xs={12} md={12} lg={12} onClick={() => this.setState({ open: true, id: 2 })} className="toggle-button">
						<Col xs={6} md={6} lg={6} >
							Directeur
			          	</Col>
						<Col xs={6} md={6} lg={6} >
							Peut modifier les fournisseurs et voir toutes les consultations
			          	</Col>
					</Button>
					<Collapse in={this.state.open && this.state.id == 2}>
						<div>
							<Modal activeNameModal='director.teams' isVisible={isVisible} component={<TeamsList teams={teamsList} type="director" checkboxOption manageTeams={(values, type) => this.manageTeams(values, type)} />} />
							<Modal activeNameModal='director.users' isVisible={isVisible} component={<UsersList users={directorUsers} type="director" checkboxOption manageMembers={(values, type) => this.manageUsers(values, type)} />} />
							<Well>
								<Row className="panel-header">
									<PanelHeaderTeams nameModal="director.teams" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={directorTeams} name="team" form="Administration.authorization.director.teams" onSubmit={values => this.submitRowAuthorization(values)} />
								</Row>
								<Row className="panel-header">
									<PanelHeaderUsers nameModal="director.users" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={directorUsers} name="user" form="Administration.authorization.director.users" onSubmit={values => this.submitRowAuthorization(values)} />
								</Row>
							</Well>
						</div>
					</Collapse> */}
				</div>
				<div className="toggle-block">
					{/* <Button xs={12} md={12} lg={12} onClick={() => this.setState({ open: true, id: 3 })} className="toggle-button">
						<Col xs={6} md={6} lg={6} >
							Acheteur
			          	</Col>
						<Col xs={6} md={6} lg={6} >
							Peut voir les consultations de son équipe
			          	</Col>
					</Button>
					<Collapse in={this.state.open && this.state.id == 3}>
						<div>
							<Modal activeNameModal='buyer.teams' isVisible={isVisible} component={<TeamsList teams={teamsList} type="buyer" checkboxOption manageTeams={(values, type) => this.manageTeams(values, type)} />} />
							<Modal activeNameModal='buyer.users' isVisible={isVisible} component={<UsersList users={buyerUsers} type="buyer" checkboxOption manageMembers={(values, type) => this.manageUsers(values, type)} />} />
							<Well>
								<Row className="panel-header">
									<PanelHeaderTeams nameModal="buyer.teams" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={buyerTeams} name="team" form="Administration.authorization.buyer.teams" onSubmit={values => this.submitRowAuthorization(values)} />
								</Row>
								<Row className="panel-header">
									<PanelHeaderUsers nameModal="buyer.users" />
								</Row>
								<Row className="panel-body">
									<ListAuthorizations list={buyerUsers} name="user" form="Administration.authorization.buyer.users" onSubmit={values => this.submitRowAuthorization(values)} />
								</Row>
							</Well>
						</div>
					</Collapse> */}
				</div>
			</Col>
		)
	}
}

function mapStateToProps(state) {
	return {
		teamsList: state.form.Administration.teams.data,
		usersList: state.form.Administration.users.data.content,
		tenantTeams: state.form.Administration.authorization.tenant.teams,
		tenantUsers: state.form.Administration.authorization.tenant.users,
		tenantRole: state.form.Administration.authorization.tenant.role,
		directorTeams: state.form.Administration.authorization.director.teams,
		directorUsers: state.form.Administration.authorization.director.users,
		buyerTeams: state.form.Administration.authorization.buyer.teams,
		buyerUsers: state.form.Administration.authorization.buyer.users,
		isVisible: state.modal.mode,
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ fetchUsers, fetchTeams, isModalVisible, selectedTeamAuthorization, selectedUserAuthorization, getResponsibilities, getScopes, resetAuthorizationsList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorizations);