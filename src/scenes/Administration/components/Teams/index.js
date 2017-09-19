import React, { Component } from 'react'
import { Row, Col, Table, ButtonGroup, Button, ButtonToolbar, Pagination, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Link, Route } from 'react-router-dom'
import Spinner from '../../../../components/Spinner'
import { fetchTeams } from '../../actions'

class Teams extends Component {
	componentWillMount() {
		this.props.fetchTeams();
	}

	render(){
		const { teams, isLoading } = this.props;
		return(
			<Row className="teams">
		        	<Col xs={12} md={12} lg={12}>
		        		{ isLoading ? 
		        			<Spinner />
		        		:
		        		<div>
		        			<Row className="clearfix equal">
				        		<Col xs={9} md={9} lg={9}>
				        			<h3>
				            			Equipes
				        			</h3>
			            		</Col>
			            		<Col xs={3} md={3} lg={3} className="panel-head">
				            		<Button>
				            			<Link to={`/administration/teams/team/new/`}>
				            				<Glyphicon glyph="plus"/>Ajouter une Equipe
				            			</Link>
				            		</Button>
			            		</Col>
		            		</Row>
		            		<Row className="clearfix">
			            		<Col xs={12} md={12} lg={12} className="list">
									<Table responsive>
									    <thead>
									      <tr>
									        <th>Equipe</th>
									        <th>Description</th>
									        <th>Actions</th>
									      </tr>
									    </thead>
									    <tbody>
											{ teams.map((team) => (
												<tr>
													<td>{ team.name }</td>
													<td>{ team.description }</td>
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
								</Col>
							</Row>
							{/*<Pagination
								bsSize="medium"
								items={teams.totalPages}
								activePage={this.state.activePage}
								onSelect={this.handleSelect} />*/}
						</div>
						}
					</Col>
			</Row>
		)
	}
}

function mapStateToProps(state) {
	return {
		teams: state.form.Administration.teams.data,
		isLoading: state.form.Administration.teams.isLoading
	};
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ fetchTeams }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Teams);