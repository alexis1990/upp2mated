import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, ButtonGroup, Button, Glyphicon, Pagination, Table } from 'react-bootstrap'
import { withRouter, Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUsers, deleteMember } from '../../../../actions'
import { Field, reduxForm } from 'redux-form'
import Spinner from '../../../../../../components/Spinner'
import _ from 'lodash'
import './styles/style.css'

const isUserSelectedInModal = (users, userSelected) => users.some((user) => user.id === userSelected.id);
const isUserExistInFormAuthorization = (user) => user.user && user.user.values;
const isUserSelectedInAuthorizationModal = (user, userSelected) => isUserExistInFormAuthorization(user) && user.user.values.id === userSelected.id;

class UsersList extends Component {
    constructor() {
        super();
        this.state = {
            activePage: 1
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        const { fetchUsers, match } = this.props;
        const { activePage } = this.state;

        fetchUsers(activePage);
    }

    handleSelect(page) {
        const { fetchUsers } = this.props;
        this.setState({ activePage: page })
        fetchUsers(page);
    }

    selectedMembers(userSelected) {
        const { users } = this.props;
        if (isUserSelectedInModal(users, userSelected)) return true;
        return users.some((user) => {
            if(isUserSelectedInAuthorizationModal(user, userSelected)) {
                return true
            }
        })
    }

    removeUser(userId) {
        const { deleteMember } = this.props;
        deleteMember(userId)
    }

    render() {
        const { isLoading, usersList, actions, manageMembers, checkboxOption, type } = this.props;

        return (
            <Row className="users">
                {isLoading ?
                    <Spinner />
                    :
                    <Col xs={12} md={12} lg={12} className="list users-list">
                        <Table responsive>
                            <thead className="panel-header-user">
                                <tr>
                                    {checkboxOption ? <th></th> : null}
                                    <th>Nom</th>
                                    <th>Email</th>
                                    {actions ? <th className="align-center">Actions</th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.content.map((user, index) => (
                                    <tr key={index}>
                                        {checkboxOption ?
                                            <td width='10%' className="select-user">
                                                <input type="checkbox" name="selected" onChange={() => manageMembers({ ...user, type: type })} checked={this.selectedMembers(user)} />
                                            </td>
                                            :
                                            ''
                                        }
                                        <td width='30%'>{user.firstname} {user.lastname}</td>
                                        <td width='30%' >{user.email}</td>
                                        {actions ?
                                            <td width='30%' className="actions" colSpan="2">
                                                <ButtonGroup justified>
                                                    <Button className="action-button"><Link to={`/administration/users/` + user.id}><Glyphicon glyph="eye-open" /></Link></Button>
                                                    <Button className="action-button"><Link to={`/administration/users/user/edit/` + user.id}><Glyphicon glyph="pencil" /></Link></Button>
                                                    <Button className="action-button" onClick={() => this.removeUser(user.id)}><Glyphicon glyph="remove" /></Button>
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
                            bsSize="small"
                            items={usersList.totalPages}
                            activePage={this.state.activePage}
                            onSelect={this.handleSelect} />
                    </Col>
                }
            </Row>
        )
    }
}

function mapStateToProps(state) {
    // console.log('USERSSSS', state.form.Administration.users)
    return {
        usersList: state.form.Administration.users.data,
        isLoading: state.form.Administration.users.isLoading
    }
}

function mapDispatchToProps() {
    return (dispatch) => bindActionCreators({ fetchUsers, deleteMember }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);