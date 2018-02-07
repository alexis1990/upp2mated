import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRoles } from './actions'
import ManageRoles from './components/ManageRoles/'
import { Table, Glyphicon, Button, ButtonGroup, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class Roles extends Component {
    componentWillMount() {
        const { getRoles } = this.props;
        getRoles();
    }
    render() {
        const { roles } = this.props;
        return (
            <Col xs={12} md={12} lg={12} className="list">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th className="align-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}>
                                <td width="40%">{role.label}</td>
                                <td width="30%">{role.description}</td>
                                <td className="actions" width="30%">
                                    <ButtonGroup justified>
                                        <Button className="action-button"><Link to={`/administration/roles/` + role.id}><Glyphicon glyph="eye-open" /></Link></Button>
                                        <Button className="action-button"><Link to={`/administration/roles/role/edit/` + role.id}><Glyphicon glyph="pencil" /></Link></Button>
                                        <Button className="action-button"><Link to='/administration/roles/manage/authorizations'><Glyphicon glyph="cog" /></Link></Button>
                                        <Button className="action-button" onClick={() => console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove" /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        roles: state.form.Administration.authorization.roles
    }
}

function mapDispatchToProps() {
    return dispatch => bindActionCreators({ getRoles }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);