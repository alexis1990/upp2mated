import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, Button, Table, Glyphicon, ButtonGroup } from 'react-bootstrap'
import { Field, Form, reduxForm } from 'redux-form'
import { withRouter, Link, Route } from 'react-router-dom'
import renderInput from '../../../../../components/Fields/input'
import Modal from '../../../../../components/Modal/'
import { isModalVisible } from '../../../../../components/Modal/actions'
import TeamCreationForm from '../components/TeamCreationForm'
import UsersList from '../../Users/components/UsersList'
import { bindActionCreators } from 'redux'
import Spinner from '../../../../../components/Spinner'
import { connect } from 'react-redux'

class CreateTeam extends Component {

	postTeam(values) {
		console.log('VALUESSS', values)
	}

	render(){
		const { users, team, teamMembers, isLoading, isModalVisible, isVisible } =  this.props;
		return(
			<div className="create-team">
                <Modal isVisible={ isVisible } component={ <UsersList /> } />
	        	<Col xs={6} md={6} lg={6}>
					<h3> Equipe </h3>
					<Form onSubmit={this.postTeam()}>
                        <TeamCreationForm />						
					</Form>
				</Col>
				<Col xs={6} md={6} lg={6} className="members list">
					<div>
                        <Row className="clearfix equal">
                            <Col xs={9} md={9} lg={9}>
                                <h4> Membres </h4>
                            </Col>
                            <Col xs={3} md={3} lg={3} className="panel-head">
                                <Button onClick={() => isModalVisible(true)}>
                                    <Glyphicon glyph="plus"/>Ajouter une Equipe
                                </Button>
                            </Col>
                        </Row>
						<Table responsive>
							<thead>
								<tr>
									<th>Nom</th>
									<th>Email</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{ teamMembers.map((user) => (
									<tr>
										<td width='30%'>{ user.firstname } { user.lastname }</td>
										<td width='40%'>{ user.email }</td>
										<td width='30%' className="actions" colSpan="2">
											<ButtonGroup justified>
												<Button className="action-button"><Link to={`/administration/teams/` + user.id}><Glyphicon glyph="eye-open"/></Link></Button>
												<Button className="action-button"><Link to={`/administration/teams/team/edit/` + user.id}><Glyphicon glyph="pencil"/></Link></Button>
												<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove"/></Button>
											</ButtonGroup>
										</td>
									</tr>
								))}
							</tbody>
						</Table>						
					</div>
				</Col>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
        team: state.form.Administration.team.data,
        teamMembers: state.form.Administration.createTeam.values.teamMembers,
        isVisible: state.modal
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ isModalVisible }, dispatch);
}

CreateTeam = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateTeam);

export default CreateTeam = reduxForm({
  	form: 'Administration.createTeam',
  	initialValues: {
  		teamMembers: []
  	}
})(withRouter((CreateTeam)))