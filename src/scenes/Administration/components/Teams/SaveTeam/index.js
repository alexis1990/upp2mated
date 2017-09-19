import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, Button, Table, Glyphicon, ButtonGroup } from 'react-bootstrap'
import { Field, Form, reduxForm } from 'redux-form'
import { withRouter, Link, Route } from 'react-router-dom'
import renderInput from '../../../../../components/Fields/input'
import { bindActionCreators } from 'redux'
import { fetchTeam } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import { connect } from 'react-redux'

class CreateTeam extends Component {

	componentWillMount(){
		const { fetchTeam, match } = this.props;
		fetchTeam(match.params.id);
	}

	postTeam(values) {
		console.log('VALUESSS', values)
	}

	render(){
		const { team, isLoading } =  this.props;
		console.log('TEAM', team.teamMembers, isLoading)
		return(
			<div className="create-team">
	        	<Col xs={6} md={6} lg={6}>
					<h3> Equipe { team.name } </h3>
					<Form onSubmit={this.postTeam()}>
						<Field type="text" name="name" placeholder="Type" component={renderInput} disabled>Type</Field>
						{/* <FormGroup controlId="formControlsTextarea"> //TODO extern component
							<ControlLabel>Description</ControlLabel>
							<FormControl componentClass="textarea" placeholder="Description" />
						</FormGroup> */}
						<Button type="submit">
							Submit
						</Button>
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
										<td>{ team.firstname } { team.lastname }</td>
										<td>{ team.email }</td>
										<td className="actions" colSpan="2">
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

CreateTeam = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateTeam);

export default CreateTeam = reduxForm({
  	form: 'Administration'
})(withRouter((CreateTeam)))