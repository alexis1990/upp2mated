import React, { Component } from 'react'
import { Row, Col, Table, Button, ButtonGroup, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TeamMembers = ({teamMembers}) => (
    <Row className="team">
        <Col>
        <h4> Membres </h4>
        <Table responsive>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { teamMembers.map((team) => (
                    <tr>
                        <td width='30%'>{ team.firstname } { team.lastname }</td>
                        <td width='40%'>{ team.email }</td>
                        <td width='30%' className="actions" colSpan="2">
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
)

 export default TeamMembers;