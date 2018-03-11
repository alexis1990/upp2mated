import React, { Component } from 'react';
import { Col, Row, Grid, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import './styles/style.css'

class ConsultationsHistory extends Component {
    informations(cell, row) {
        return (
            <div className="informations">
                <span><Glyphicon glyph="unchecked" className="block-icon" /> Détails</span>
                <span><Glyphicon glyph="menu-hamburger" className="block-icon" /> Résumé</span>
            </div>
        )
    }
    progression(cell, row) {
        return (
            <div
                style={{
                    width: '100%',
                    height: '20px',
                    backgroundColor: '#dadada',
                    borderRadius: '2px'
                }}
            >
                <div
                    className='progress-bar-table'
                    style={{
                        width: `${cell}%`,
                        textAlign: 'center',
                        color: 'white',
                        height: '100%',
                        backgroundColor: cell > 66 ? '#0189a9'
                            : cell > 33 ? '#ffbf00'
                                : '#ff2e00',
                        borderRadius: '2px',
                        transition: 'width 1s ease-in-out'
                    }}
                >{cell > 33 && cell < 45 ? 'Brouillon'
                    : cell > 45 && cell < 80 ? '#Envoyée'
                        : cell === 100 ? 'Terminée'
                            : 'Cloturée'}</div>
            </div>
        )
    }
    render() {
        return (
            <BootstrapTable
                className="dashboard-table"
                ref='table' data={[{ id: 1, type: "RFI", label: "Morbi sed pharetra treo", endDate: "02/10/2016", progression: 100 }, { id: 1, type: "RFQ", label: "Monster furi yote road", endDate: "02/10/2018", progression: 100 }, , { id: 1, type: "RFQ", label: "Monster furi yote road", endDate: "02/10/2018", progression: 100 }]}>
                <TableHeaderColumn width='8%' dataField='id' isKey={true} dataSort={true}>Numéro</TableHeaderColumn>
                <TableHeaderColumn width='10%' dataField='type' dataSort={true}>Type</TableHeaderColumn>
                <TableHeaderColumn width='20%' dataField='label' dataSort={true}>Libellé</TableHeaderColumn>
                <TableHeaderColumn width='12%' dataField='endDate' dataSort={true}>Terminée le </TableHeaderColumn>
                <TableHeaderColumn width='35%' dataField='progression' dataSort={true} dataFormat={this.progression}>Progression</TableHeaderColumn>
                <TableHeaderColumn width='15%' dataField='' dataFormat={this.informations}></TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default ConsultationsHistory;