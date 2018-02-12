import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTeamField, removeTeamField } from '../../../actions'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button, Col, Row, Glyphicon, Table, OverlayTrigger, Tooltip } from 'react-bootstrap'
import renderInput from '../../../../../components/Fields/input'
import Select from '../../../../../components/Fields/select'
import { postSupplier, getFinancialHealth } from '../../../actions'
import ContactList from '../../../components/ContactList/index'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'

const tooltip = (
    <Tooltip id="tooltip">
        <strong>Lorem ipsum onrli ielero poieun zneu alm</strong> Lorem ipsum onrli ielero
    </Tooltip>
);

class FinancialHealth extends Component {
    componentWillMount() {
        const { supplierId, getFinancialHealth } = this.props;
        getFinancialHealth(supplierId);
    }
    submit() {

    }
    render() {
        const { handleSubmit, fields, addTeamField, removeTeamField, listTeamMembers, contactPersonList, submit } = this.props;
        return (
            <Col xs={12} md={12} lg={12} className="financial-health">
                <h3>Santé Financiére</h3>
                <Row className="show-grid">
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Col xs={12} md={12} lg={12}>
                            <Field type="number" placeholder={`Chiffre d'affaire ${moment().format('YYYY')}`} label="Chiffre d'affaire 2018" name="actualTurnover" component={renderInput}>Nom</Field>
                            <Field type="number" placeholder={`Chiffre d'affaire ${moment().format('YYYY') - 1}`} label="Chiffre d'affaire 2017" name="oldTurnover" component={renderInput}>Nom</Field>
                            <Field type="number" placeholder="Capitaux Propres" label="Capitaux Propres" name="technology" component={renderInput}>Technologie</Field>
                            <Field type="number" placeholder="Dette Financiére" label="Dette Financiére" name="coreBusiness" component={renderInput}>Coeur de Métier</Field>
                            <Field type="number" placeholder="Excédent Brute d'exploitation" label="Excédent Brute d'exploitation" name="description" component={renderInput}>Description</Field>
                            <Field type="text" placeholder="Résultat Net" label="Résultat Net" name="netResult" component={renderInput}>Localisation Siége</Field>
                        </Col>
                        <Col xs={12} md={12} lg={12} className="align-right">
                            <Button type="submit" bsStyle="action-button">Enregistrer</Button>
                        </Col>
                    </form>
                    <Col xs={12} md={12} lg={12}>
                        <hr style={{ borderTop: "dashed #ececec" }} />
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                        <h3>Evaluation du </h3>
                    </Col>
                    <Col xs={12} md={12} lg={12} className="health-status">
                        <Col xs={12} md={12} lg={6}>
                            Etat de santé :
                        </Col>
                        <Col xs={12} md={12} lg={6} className="align-right">
                            <span className={`grade`}>Excellent</span>
                        </Col>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Détail</th>
                                    <th>Résultat</th>
                                    <th>Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Endettement financier
                                        <OverlayTrigger placement="top" overlay={tooltip}>
                                            <Glyphicon glyph="info-sign" className="information" />
                                        </OverlayTrigger>
                                    </td>
                                    <td>40.34%</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>Evolution de l'activitée</td>
                                    <td>100.34%</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Rentabilité nette</td>
                                    <td>40.34%</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>Rentabilité d'exploitation</td>
                                    <td>20.34%</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Total</td>
                                    <td>11</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        postSupplier,
        getFinancialHealth
    }, dispatch);
}

export default reduxForm({
    form: 'Suppliers.financialHealth'
})(connect(mapStateToProps, mapDispatchToProps)(FinancialHealth))