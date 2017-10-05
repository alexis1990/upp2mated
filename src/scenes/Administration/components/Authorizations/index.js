import React, { Component }from 'react'
import { connect } from 'react-redux'
import { Collapse, Well, Button, Col, Row } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { isModalVisible } from '../../../../components/Modal/actions'
import TeamsList from '../Teams/components/TeamsList'
import UsersList from '../Users/components/UsersList'
import Modal from '../../../../components/Modal/'
import { fetchUsers, selectedTeamTenant, selectedUserTenant, postRowAuthorization } from '../../actions'
import ListAuthorizations from './components/ListAuthorizations/'
import './styles/style.css'

class Authorizations extends Component {
	constructor() {
		super()
		this.state = {};
	}

	manageTeams(team) {
		const { selectedTeamTenant } = this.props;
		selectedTeamTenant(team);
	}

	manageUsers(user) {
		const { selectedUserTenant } = this.props;
		selectedUserTenant(user);
	}

	submitRowAuthorization(rowAuthorization) {
		postRowAuthorization(rowAuthorization);
	}

	render(){
		const { teams, users, isVisible, isLoading, tenantTeams, tenantUsers, isModalVisible } = this.props;

		return(
			<Col xs={12} md={12} lg={12} className="toggle-authorization">
				<Row>
					<Col xs={6} md={6} lg={6} >
						<strong>Rôle</strong>
					</Col>
					<Col xs={6} md={6} lg={6} >
						<strong>Description</strong>
					</Col>
				</Row>
				<div>
					<Button xs={12} md={12} lg={12} onClick={ ()=> this.setState({ open: !this.state.open })} className="toggle-button">
			          	<Col xs={6} md={6} lg={6} >
			          		Administrateur Tenant
			          	</Col>
			          	<Col xs={6} md={6} lg={6} >
			          		Personne ayant tous les droit
			          	</Col>
			        </Button>
			        <Collapse in={this.state.open}>
			          <div>
			            <Modal activeNameModal='teams' isVisible={ isVisible } component={ <TeamsList teams={teams} checkboxOption manageTeams={this.manageTeams.bind(this)} /> } />
			            <Modal activeNameModal='users' isVisible={ isVisible } component={ <UsersList users={tenantUsers} checkboxOption manageMembers={this.manageUsers.bind(this)} /> } />
			            <Well>
			            	<Row>
				            	<Col xs={4} md={4} lg={4} >
				          			Equipe
				          		</Col>
				            	<Col xs={4} md={4} lg={4} >
				          			Fonction
				          		</Col>
				            	<Col xs={3} md={3} lg={3} >
				          			Niveau
				          		</Col>
				            	<Col xs={1} md={1} lg={1} >
				          			<Button onClick={ ()=> isModalVisible(true, 'teams') }>
				          			+
				          			</Button>
				          		</Col>
			          		</Row>
			          		<Row>
				            	<ListAuthorizations list={tenantTeams} name="teams" section="tenant" onSubmit={values => this.submitRowAuthorization(values)} />
			          		</Row>
			          		<Row>
				            	<Col xs={4} md={4} lg={4} >
				          			Membre
				          		</Col>
				            	<Col xs={4} md={4} lg={4} >
				          			Fonction
				          		</Col>
				            	<Col xs={3} md={3} lg={3} >
				          			Niveau
				          		</Col>
				            	<Col xs={1} md={1} lg={1} >
				          			<Button onClick={ ()=> isModalVisible(true, 'users') }>
				          			+
				          			</Button>
				          		</Col>
			          		</Row>
			          		<Row>
				            	<ListAuthorizations list={tenantUsers} name="users" section="tenant" onSubmit={values => this.submitRowAuthorization(values)} />
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
	console.log('STTTTTT', state)
	return {
		teams: state.form.Administration.teams.data,
		users: state.form.Administration.users.data.content,
		tenantTeams: state.form.Administration.authorization.tenant.values.teams,
		tenantUsers: state.form.Administration.authorization.tenant.values.users,
		isVisible : state.modal.mode,
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ fetchUsers, isModalVisible, selectedTeamTenant, selectedUserTenant }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Authorizations);