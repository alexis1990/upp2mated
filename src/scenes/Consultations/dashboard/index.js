import React, { Component } from 'react';
import { Col, Row, Grid, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import './styles/style.css'

class ConsultationDashboard extends Component {
    progression(cell, row) {
        // return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
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
                textAlign:'center',
                color:'white',
                height: '100%',
                backgroundColor: cell > 66 ? '#0189a9'
                  : cell > 33 ? '#ffbf00'
                  : '#ff2e00',
                borderRadius: '2px',
                transition: 'width 1s ease-in-out'
              }}
            >{cell}</div>
          </div>
        )
    }
    render() {
        return (
            <Grid fluid className="consultations-dashboard">
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <div>
                        <Row>
                            <Col xs={12} md={12} lg={12} className="title">
                                <Glyphicon glyph="edit" />         
                                <h4>Démarer une nouvelle consultation :</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} lg={4} className="block">
                                <h4><strong>Nouvelle consultation RFI</strong></h4>
                                <p>(Request for quotation)</p>
                                <Button type="button" className="small-button">
                                    <Link to="consultations/1">Démarrer</Link>
                                </Button>
                                <Glyphicon glyph="info-sign" className="block-icon" />
                            </Col>
                            <Col xs={12} md={4} lg={4} className="block">
                                <h4><strong>Nouvelle consultation RFQ</strong></h4>
                                <p>(Request for quotation)</p>
                                <Button type="button" className="small-button">
                                    <Link to="consultations/1">Démarrer</Link>
                                </Button>
                                <Glyphicon glyph="file" className="block-icon" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <hr style={{ borderTop: "dashed #ececec" }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} lg={12} className="title">
                                <Glyphicon glyph="edit" />         
                                <h4>Démarer une nouvelle consultation :</h4>
                            </Col>
                        </Row>
                        <BootstrapTable 
                            className="dashboard-table" 
                            ref='table' data={[{ id: 1, type: "RFI", label: "Morbi sed pharetra treo", endDate: "02/10/2016", progression: 27 }, { id: 1,  type: "RFQ", label: "Monster furi yote road", endDate: "02/10/2018", progression: 63 }, , { id: 1,  type: "RFQ", label: "Monster furi yote road", endDate: "02/10/2018", progression: 100 }]}>
                            <TableHeaderColumn width='10%' dataField='id' isKey={true} dataSort={true}>Numéro</TableHeaderColumn>
                            <TableHeaderColumn width='10%' dataField='type' dataSort={true}>Type</TableHeaderColumn>
                            <TableHeaderColumn width='20%' dataField='label' dataSort={true}>Libellé</TableHeaderColumn>
                            <TableHeaderColumn width='12%' dataField='endDate' dataSort={true}>Date de clôture</TableHeaderColumn>
                            <TableHeaderColumn width='48%' dataField='progression' dataSort={true} dataFormat={this.progression}>Progression</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </Col>
            </Row>
        </Grid>
        )
    }
}

export default ConsultationDashboard;