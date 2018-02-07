import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'
import Spinner from '../../../../../../components/Spinner'
import { fetchTeams, deleteTeam } from '../../../../actions'
import { Link } from 'react-router-dom'
import './styles/style.css'

class TeamsList extends Component {
    
    selectedMembers(team) {
        const { teamsSelected } = this.props;
        if(!!teamsSelected){
            if(teamsSelected.some((selectedTeam) => selectedTeam.id === team.id)) return true;
        }
    }

    removeTeam(team) {
        const { deleteTeam } = this.props;
        const teamId = team.id;
        deleteTeam(teamId)
    }

    render() {
        const { teams, actions, isLoading, manageTeams, checkboxOption, type } = this.props;
        return (
            isLoading ?
                <Spinner />
                :
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Equipe</th>
                            <th>Description</th>
                            {actions ? <th className="align-center">Actions</th> : ''}
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id}>
                                {checkboxOption ?
                                    <td width='10%' className="select-user">
                                        <input type="checkbox" name="selected" onChange={() => manageTeams({ ...team, type: type })} checked={this.selectedMembers(team)} />
                                    </td>
                                    :
                                    ''
                                }
                                <td width="40%">{team.name}</td>
                                <td width="30%">{team.description}</td>
                                {actions ?
                                    <td className="actions" width="30%">
                                        <ButtonGroup justified>
                                            <Button className="action-button"><Link to={`/administration/teams/` + team.id}><Glyphicon glyph="eye-open" /></Link></Button>
                                            <Button className="action-button"><Link to={`/administration/teams/team/edit/` + team.id}><Glyphicon glyph="pencil" /></Link></Button>
                                            <Button className="action-button" onClick={() => this.removeTeam(team)}><Glyphicon glyph="remove" /></Button>
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
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps() {
    return (dispatch) => bindActionCreators({ fetchTeams, deleteTeam }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsList);