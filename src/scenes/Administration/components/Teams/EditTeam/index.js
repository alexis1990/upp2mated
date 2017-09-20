import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, Button, Table, Glyphicon, ButtonGroup } from 'react-bootstrap'
import { Field, Form, reduxForm } from 'redux-form'
import { withRouter, Link, Route } from 'react-router-dom'
import renderInput from '../../../../../components/Fields/input'
import TeamCreationForm from '../components/TeamCreationForm'
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
						<h4> Membres </h4>
						<Table responsive>
							<thead>
								<tr>
									<th>Nom</th>
									<th>Email</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{ team.teamMembers.map((team) => (
									<tr>
										<td width='30%'>{ team.firstname } { team.lastname }</td>
										<td width='40%'>{ team.email }</td>
										<td width='30%' className="actions" colSpan="2">
											<ButtonGroup justified>
												<Button className="action-button"><Link to={`/administration/teams/` + team.id}><Glyphicon glyph="eye-open"/></Link></Button>
												<Button className="action-button"><Link to={`/administration/teams/team/edit/` + team.id}><Glyphicon glyph="pencil"/></Link></Button>
												<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove"/></Button>
											</ButtonGroup>
										</td>
									</tr>
								))}
							</tbody>
						</Table>						
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