import React, { Component } from 'react';
import { Col, Row, Grid, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import ConsultationsInProgress from './components/ConsultationsInProgress/'
import ConsultationsHistory from './components/ConsultationsHistory/'
import './styles/style.css'

class ConsultationDashboard extends Component {
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
                                <Glyphicon glyph="duplicate" />         
                                <h4>Consultation en cour :</h4>
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                                <ConsultationsInProgress />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} lg={12} className="title">
                                <Glyphicon glyph="repeat" />         
                                <h4>Historique :</h4>
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                                <ConsultationsHistory />
                            </Col>
                        </Row>                    
                    </div>
                </Col>
            </Row>
        </Grid>
        )
    }
}

export default ConsultationDashboard;