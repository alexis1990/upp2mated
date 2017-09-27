import React from 'react'
import { Table, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'
import Spinner from '../../../../../../components/Spinner'
import { Link } from 'react-router-dom'

const TeamsList = ({ teams, actions, isLoading }) => (
    isLoading ?
        <Spinner />
    :
        <Table responsive>
            <thead>
                <tr>
                    <th>Equipe</th>
                    <th>Description</th>
                    { actions ? <th className="align-center">Actions</th> : '' }
                </tr>
            </thead>
            <tbody>
                { teams.map((team) => (
                    <tr>
                        <td width="40%">{ team.name }</td>
                        <td width="30%">{ team.description }</td>
                        { actions ? 
                            <td className="actions" width="30%">
                                <ButtonGroup justified>
                                    <Button className="action-button"><Link to={`/administration/teams/` + team.id}><Glyphicon glyph="eye-open"/></Link></Button>
                                    <Button className="action-button"><Link to={`/administration/teams/team/edit/` + team.id}><Glyphicon glyph="pencil"/></Link></Button>
                                    <Button className="action-button" onClick={()=> console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove"/></Button>
                                </ButtonGroup>
                            </td>
                            :
                            ''
                        }
                    </tr>
                ))}
            </tbody>
        </Table>
)
export default TeamsList;