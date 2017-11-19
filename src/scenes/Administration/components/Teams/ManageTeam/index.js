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
import { fetchTeamToManage, selectedMember, editTeam, postNewTeam } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import { connect } from 'react-redux'

const isTeamIdExist = (match) => !!match.params.id;

class ManageTeam extends Component {
	constructor() {
        super();
        this.state = {
            team : {
                teamMembers: []
            }
        }
		this.manageTeam = this.manageTeam.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({team: nextProps.team})
    }

	componentWillMount(){
        const { fetchTeamToManage, match } = this.props;
        const teamId = match.params.id;
        if(isTeamIdExist(match)){
            fetchTeamToManage(teamId);
        }
    }
    
    postTeam() {
        const { team, history, postNewTeam } = this.props;
		postNewTeam(team, history);
	}

	editTeam() {
		const { team, history, editTeam } = this.props;
		editTeam(team, history)
    }
    
    manageTeam(e, team) {
        e.preventDefault();
        const { match } = this.props;
        if(isTeamIdExist(match)) {
            this.editTeam();
        } else {
            this.postTeam();
        }
    }

	manageMembers(member){
		const { selectedMember } = this.props;
		selectedMember(member);	
	}

	render(){
        const { isLoading, isModalVisible, isVisible } =  this.props;
        const { team } =  this.state;

		return(
			<div className="create-team">
				<Modal isVisible={ isVisible } component={ <UsersList checkboxOption users={team.teamMembers} manageMembers={this.manageMembers.bind(this)} /> } />
	        	<Form onSubmit={this.manageTeam}>
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
		team: state.form.Administration.manageTeam.values,
		isLoading: state.form.Administration.manageTeam.isLoading,
		isVisible: state.modal.mode
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ 
		fetchTeamToManage, 
		isModalVisible, 
		selectedMember, 
        editTeam, 
        postNewTeam
	}, dispatch);
}

ManageTeam = connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageTeam);

export default ManageTeam = reduxForm({
	form: 'Administration.manageTeam',
	initialValues: {
		teamMembers: []
    },
})(withRouter((ManageTeam)))