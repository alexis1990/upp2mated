import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, ButtonGroup, Button, Glyphicon, Pagination, Table } from 'react-bootstrap'
import { withRouter, Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUsers } from '../../../../actions'
import { Field, reduxForm } from 'redux-form'
import Spinner from '../../../../../../components/Spinner'
import _ from 'lodash'

class UsersList extends Component {
    constructor(){
        super();
        this.state = {
            activePage: 1
        }
        this.handleSelect = this.handleSelect.bind(this);
    }
	
	componentWillMount(){
        const { fetchUsers, match } = this.props;
        const { activePage } = this.state;
		
		fetchUsers(activePage);
    }
    
    handleSelect(page) {
        const { fetchUsers } = this.props;
        this.setState({ activePage : page })
        fetchUsers(page);
    }

    selectedMembers(user) {
        const { teamMembers } = this.props;
        console.log('TEAMMEBERS', teamMembers)
        if(teamMembers.some((member) => member.id === user.id)) return true;
    }

	render(){
		const { isLoading, users, actions, manageMembers, checkboxOption } = this.props;

		return(
			<Row className="users">
	        		{	isLoading ?
	        				<Spinner />
	        			:
                        <Col xs={12} md={12} lg={12} className="list">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        { actions ? <th className="align-center">Actions</th> : null }
                                    </tr>
                                </thead>
                                <tbody>
                                    { users.content.map((user, index) => (
                                        <tr>
                                            { checkboxOption ? 
                                            <td width='10%'>						      		
                                                <input type="checkbox" name="selected" onChange={() => manageMembers(user)} checked={this.selectedMembers(user)} />
                                            </td> 
                                            : 
                                            ''
                                            }
                                            <td width='30%'>{ user.firstname } { user.lastname }</td>
                                            <td width='30%' >{ user.email }</td>
                                            { actions ? 
                                                <td width='30%' className="actions" colSpan="2">
                                                    <ButtonGroup justified>
                                                        <Button className="action-button"><Link to={`/administration/teams/` + user.id}><Glyphicon glyph="eye-open"/></Link></Button>
                                                        <Button className="action-button"><Link to={`/administration/teams/team/edit/` + user.id}><Glyphicon glyph="pencil"/></Link></Button>
                                                        <Button className="action-button" onClick={() => manageMembers(user)}><Glyphicon glyph="remove"/></Button>
                                                    </ButtonGroup>
                                                </td>
                                                :
                                                null
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination
                                bsSize="medium"
                                items={users.totalPages}
                                activePage={this.state.activePage}
                                onSelect={this.handleSelect} />
                        </Col>
					}
			</Row>
		)
	}
}

function mapStateToProps(state) {
	return {
        users: state.form.Administration.users.data,
		isLoading: state.form.Administration.users.isLoading
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ fetchUsers }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps) (UsersList);