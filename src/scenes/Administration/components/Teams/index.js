import React, { Component } from 'react'
import { Row, Col, Table, ButtonGroup, Button, Pagination, Glyphicon } from 'react-bootstrap'
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
			<Row className="team">
		        	<Col xs={12} md={12} lg={12} className="list">
		        		{ isLoading ? 
		        			<Spinner />
		        		:
		        		<div>
			    			<h3>
			            		Equipes
			        		</h3>
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
													<Button className="action-button"><Link to={`/administration/team/` + team.id}><Glyphicon glyph="eye-open"/></Link></Button>
													<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<2')}><Glyphicon glyph="pencil"/></Button>
													<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove"/></Button>
												</ButtonGroup>
											</td>
										</tr>
									))}
							    </tbody>
							</Table>
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