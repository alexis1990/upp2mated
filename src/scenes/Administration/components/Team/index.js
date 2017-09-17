import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import { withRouter, Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchTeam } from '../../actions'
import Spinner from '../../../../components/Spinner'

class TeamView extends Component {
	
	componentWillMount(){
		const { fetchTeam, match } = this.props;
		
		fetchTeam(match.params.id);
	}

	render(){
		const { isLoading, team } = this.props;

		return(
			<Row className="team">
	        	<Col xs={12} md={12} lg={12} className="team">
	        		{	isLoading ?
	        				<Spinner />
	        			:
	        				<div>
		    					{ team.name}
							</div>
					}
				</Col>
			</Row>
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