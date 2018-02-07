import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import * as moment from 'moment';
import '../../../node_modules/moment/locale/fr.js';
import { Link } from 'react-router-dom'
import './styles/style.css'

class Dashboard extends Component {
    priceFormatter(cell, row) {
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
              className='consultations-progress-bar'
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
        moment.locale('fr');
        const actualDate = moment().format('dddd DD MMMM YYYY');
        return (
            <Grid fluid className="dashboard">
                <Row>
                    <Col xs={12} md={6} lg={6}>
                        <h2 className="date">{actualDate}</h2>
                        <ul>
                            <li>• Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</li>
                            <li>• Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
                            <li>• Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</li>
                        </ul>
                    </Col>
                    <Col xs={12} md={3} lg={3} className="align-center">
                        <Col xs={12} md={12} lg={12} className="align-center box">
                            <Col xs={12} md={12} lg={12} className="align-center">
                                <h4>Nouvelle consultation :</h4>
                            </Col>
                            <Col xs={12} md={6} lg={6} className="buttons-row">
                                <Button type="button" bsStyle="btn btn-action-button" linkTo>
                                    <Link to={`/consultations/1`}>RFI</Link>
                                </Button>
                            </Col>
                            <Col xs={12} md={6} lg={6} className="buttons-row">
                                <Button type="button" bsStyle="btn btn-action-button">RFQ</Button>
                            </Col>
                            <Col xs={12} md={12} lg={12} className="buttons-row">
                                <Button type="button" bsStyle="btn btn-action-button">Actualiser les prix</Button>
                            </Col>
                        </Col>
                    </Col>
                    <Col xs={12} md={3} lg={3} className="align-center">
                        <Col xs={12} md={12} lg={12} className="align-center box">
                            <Col xs={12} md={12} lg={12} className="align-center">
                                <h4>Extraction de données :</h4>
                            </Col>
                            <Col xs={12} md={6} lg={6} className="buttons-row align-right">
                                <Button type="button" bsStyle="btn btn-action-button">Catégories</Button>
                            </Col>
                            <Col xs={12} md={6} lg={6} className="buttons-row align-left">
                                <Button type="button" bsStyle="btn btn-action-button">
                                    <Link to={`/suppliers`}>Fournisseurs</Link>
                                </Button>
                            </Col>
                            <Col xs={12} md={12} lg={12} className="buttons-row">
                                <Button type="button" bsStyle="btn btn-action-button">Nomenclatures</Button>
                            </Col>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <div>
                            <h3>Avancement des consultations :</h3>
                            <BootstrapTable 
                                className="dashboard-table" 
                                ref='table' data={[{ id: 1, type: "RFI", label: "Morbi sed pharetra treo", endDate: "02/10/2016", progression: 27 }, { id: 1,  type: "RFQ", label: "Monster furi yote road", endDate: "02/10/2018", progression: 63 }, , { id: 1,  type: "RFQ", label: "Monster furi yote road", endDate: "02/10/2018", progression: 100 }]}>
                                <TableHeaderColumn width='10%' dataField='id' isKey={true} dataSort={true}>Numéro</TableHeaderColumn>
                                <TableHeaderColumn width='10%' dataField='type' dataSort={true}>Type</TableHeaderColumn>
                                <TableHeaderColumn width='20%' dataField='label' dataSort={true}>Libellé</TableHeaderColumn>
                                <TableHeaderColumn width='12%' dataField='endDate' dataSort={true}>Date de clôture</TableHeaderColumn>
                                <TableHeaderColumn width='48%' dataField='progression' dataSort={true} dataFormat={this.priceFormatter}>Progression</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Dashboard;