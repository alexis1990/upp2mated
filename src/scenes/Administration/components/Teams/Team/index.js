import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import { withRouter, Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchTeam } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import TeamMembers from '../components/TeamMembers/'

class TeamView extends Component {
	
	componentWillMount(){
		const { fetchTeam, match } = this.props;
		
		fetchTeam(match.params.id);
	}

	render(){
		const { isLoading, team } = this.props;

		return(
			<Col xs={12} md={12} lg={12}>
				{	isLoading ?
						<Spinner />
					:
						<Row>
							<Col xs={6} md={6} lg={6}>
								<h3>{ team.name}</h3>
								<div><strong>Description :</strong></div>
								<p>{ team.description}</p>
							</Col>
							<Col xs={6} md={6} lg={6} className="list">
								<TeamMembers teamMembers={team.teamMembers} />
							</Col>
						</Row>
				}
			</Col>
		)
	}
}

function mapStateToProps(state) {
	return {
		team: state.form.Administration.team.data,
		isLoading: state.form.Administration.team.isLoading
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ fetchTeam }, dispatch);
}

 export default withRouter(connect(mapStateToProps, mapDispatchToProps) (TeamView));