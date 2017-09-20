import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, ButtonGroup, Button, Glyphicon, Pagination } from 'react-bootstrap'
import { withRouter, Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUsers, selectedMembers } from '../../../../actions'
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

    addMembers(member) {
        const { selectedMembers } = this.props;
        selectedMembers(member);
    }

	render(){
		const { isLoading, users } = this.props;

		return(
			<Row className="users">
	        	<Col xs={12} md={12} lg={12}>
	        		{	isLoading ?
	        				<Spinner />
	        			:
	        				<Row>
	        					<Col xs={12} md={12} lg={12} className="list">
                                    <div>
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Email</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users.content.map((user, index) => (
                                                <tr>
                                                    <td width='10%'>						      		
                                                        <input type="checkbox" onChange={() => this.addMembers(user)} checked={user.selected} />
                                                    </td>
                                                    <td width='30%'>{ user.firstname } { user.lastname }</td>
                                                    <td width='30%' >{ user.email }</td>
                                                    <td width='30%' className="actions" colSpan="2">
                                                        <ButtonGroup justified>
                                                            <Button className="action-button"><Link to={`/administration/teams/` + user.id}><Glyphicon glyph="eye-open"/></Link></Button>
                                                            <Button className="action-button"><Link to={`/administration/teams/team/edit/` + user.id}><Glyphicon glyph="pencil"/></Link></Button>
                                                            <Button className="action-button" onClick={() => this.addMembers(user)}><Glyphicon glyph="remove"/></Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <Pagination
                                        bsSize="medium"
                                        items={users.totalPages}
                                        activePage={this.state.activePage}
                                        onSelect={this.handleSelect} />
                                    </div>
								</Col>
							</Row>
					}
				</Col>
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
	return (dispatch) => bindActionCreators({ fetchUsers, selectedMembers }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps) (UsersList);