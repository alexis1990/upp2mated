import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import { withRouter, Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CreateTeam extends Component {

	render(){
		return(
			<Row className="team">
	        	<Col xs={12} md={12} lg={12}>
	        		okokokokok
				</Col>
			</Row>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({}, dispatch);
}

 export default withRouter(connect(mapStateToProps, mapDispatchToProps) (CreateTeam));