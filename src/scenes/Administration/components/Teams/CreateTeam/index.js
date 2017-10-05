import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, Button, Table, Glyphicon, ButtonGroup } from 'react-bootstrap'
import { Field, Form, reduxForm } from 'redux-form'
import { withRouter, Link, Route } from 'react-router-dom'
import renderInput from '../../../../../components/Fields/input'
import Modal from '../../../../../components/Modal/'
import { isModalVisible } from '../../../../../components/Modal/actions'
import { postNewTeam } from '../../../actions'
import TeamCreationForm from '../components/TeamCreationForm/'
import TeamMembers from '../components/TeamMembers/'
import UsersList from '../../Users/components/UsersList'
import { selectedMemberCreation } from '../../../actions'
import { bindActionCreators } from 'redux'
import Spinner from '../../../../../components/Spinner'
import { connect } from 'react-redux'

class CreateTeam extends Component {

	postTeam(e) {
		e.preventDefault();
		const { postNewTeam, newTeam, history } = this.props;
		postNewTeam(newTeam, history);
	}

	manageMembers(member) {
        const { selectedMemberCreation } = this.props;
        selectedMemberCreation(member);
    }

	render(){
		const { users, team, teamMembers, isLoading, isModalVisible, isVisible } =  this.props;
		return(
			<div className="create-team">
                <Modal isVisible={ isVisible } component={ <UsersList checkboxOption users={teamMembers} manageMembers={this.manageMembers.bind(this)} /> } />
	        	<Form onSubmit={(e) => this.postTeam(e)}>
		        	<Col xs={6} md={6} lg={6}>
						<h3> Equipe </h3>			
	                    <TeamCreationForm />						
					</Col>
					<Col xs={6} md={6} lg={6} className="members list">
						<div>
	                        <Row className="clearfix equal">
	                            <Col xs={9} md={9} lg={9}>
	                                <h4> Membres </h4>
	                            </Col>
	                            <Col xs={3} md={3} lg={3} className="panel-head">
	                                <Button onClick={() => isModalVisible(true)}>
	                                    <Glyphicon glyph="plus"/>Gérer les membres
	                                </Button>
	                            </Col>
	                        </Row>
							<Row>
								<Col xs={12} md={12} lg={12}>
									<TeamMembers teamMembers={ teamMembers } />
								</Col>
							</Row>			
						</div>
					</Col>
					<Col xs={12} md={12} lg={12}>
						<Button type="submit" className="pull-right">
							Submit
						</Button>
					</Col>
				</Form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
        team: state.form.Administration.team.data,
		teamMembers: state.form.Administration.createTeam.values.teamMembers,
		newTeam: state.form.Administration.createTeam.values,
        isVisible: state.modal.mode
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ isModalVisible, postNewTeam, selectedMemberCreation }, dispatch);
}

export default CreateTeam = reduxForm({
  	form: 'Administration.createTeam',
  	initialValues: {
  		teamMembers: []
  	},
  	destroyOnUnmount: false
})(withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateTeam)))