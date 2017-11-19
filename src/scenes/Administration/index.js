import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, Button } from 'react-bootstrap'
import Teams from './components/Teams/'
import Users from './components/Users/'
import QualitySurvey from './components/QualitySurvey/'
import Authorizations from './components/Roles/components/Authorizations/'
import Roles from './components/Roles/'
import './styles/style.css'

class Administration extends Component {
	render() {
		return (
			<Grid className="administration" fluid>
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row className="clearfix">
						<Col sm={4}>
							<h3>
								Administration
					        </h3>
							<Nav bsStyle="pills" stacked>
								<NavItem eventKey="first">
									Equipes
					          	</NavItem>
								<NavItem eventKey="second">
									Utilisateurs
					          	</NavItem>
								<NavItem eventKey="third">
									Droits et roles
					          	</NavItem>
								<NavItem eventKey="fourth">
									Questionnaires Qualités
					          	</NavItem>
							</Nav>
						</Col>
						<Col sm={8}>
							<Tab.Content animation>
								<Tab.Pane eventKey="first">
									<Teams />
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<Users />
								</Tab.Pane>
								<Tab.Pane eventKey="third">
									{/* <Authorizations /> */}
									<Roles />
								</Tab.Pane>
								<Tab.Pane eventKey="fourth">
									{/* <Authorizations /> */}
									<QualitySurvey />
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Grid>
		)
	}
}

export default Administration;