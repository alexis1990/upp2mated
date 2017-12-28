import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, ButtonGroup, Button, Glyphicon, Pagination, Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchSuppliers } from '../../../../../../../Suppliers/actions'
import { sendQualitySurveyToSuppliers } from '../../../../actions'
// import TableComponent from '../../../../../../../../components/Table/index'
import ContactsSuppliers from './components/ContactsSuppliers'
import { BootstrapTable, TableHeaderColumn, SizePerPageDropDown } from 'react-bootstrap-table';
import { Field, reduxForm, Form } from 'redux-form'
import Spinner from '../../../../../../../../components/Spinner'
import _ from 'lodash'
import './styles/style.css'

const isContactAlreadyExist = (selectedContact, selectedContactsList) => {
    return selectedContactsList.findIndex((contact) => contact.contactId === selectedContact.contactId) >= 0
}

class SelectSuppliersModal extends Component {
    constructor() {
        super();
        this.state = {
            activePage: 1,
            selectedContacts : []
        }
    }

    componentWillMount() {
        const { fetchSuppliers, match } = this.props;
        const { activePage } = this.state;
        fetchSuppliers(activePage);
    }

    handleSelect(page) {
        const { fetchSuppliers } = this.props;
        this.setState({ activePage: page })
        fetchSuppliers(page);
    }

    isExpandableRow(row) {
        return true;
    }

    updateSelectedContactListState(supplier, contact) {
        const selectedContactList =  this.state.selectedContacts;
        const selectedContact = {
            contactId: contact.id,
            supplierId: supplier.id
        };

        if(isContactAlreadyExist(selectedContact, selectedContactList)) {
            const finalContactList = selectedContactList.filter((contact) => contact.contactId !== selectedContact.contactId)
            this.setState({ selectedContacts: finalContactList})
        } else {
            this.setState({ selectedContacts: this.state.selectedContacts.concat(selectedContact) })
        }
    }

    onSelectAllSuppliers(supplier, isSelected, contacts) {
        if(isSelected) {
            const selectedContacts =  contacts.map((contact) =>({
                contactId: contact.id,
                supplierId: supplier.id
            }))
            this.setState({ selectedContacts: selectedContacts})
            return true;
        } else {
            this.setState({selectedContacts: []})
        }
    }
    
    expandComponent(row) {
        return (
            <ContactsSuppliers supplier={row} handleRowSelect={this.updateSelectedContactListState.bind(this, row)} onSelectAll={this.onSelectAllSuppliers.bind(this, row)}  />
        );
    }

    renderPaginationPanel = (props) => {
        return (
            <Col xs={12} md={12} lg={12}>
                <Row>
                    <Col xs={6} md={6} lg={6} className="page-list-buttons">
                        { props.components.pageList }
                    </Col>
                    <Col xs={6} md={6} lg={6} className="align-right send-button">
                        <Button type="button" onClick={this.sendSupplierContactPersonList.bind(this)} bsStyle="btn btn-action-button">Envoyer</Button>
                    </Col>
                </Row>
            </Col>
        );
      }

    sendSupplierContactPersonList() {
        const { match, sendQualitySurveyToSuppliers } = this.props;
        const qualitySurveyId = match.params.id;
        const selectedContacts = this.state.selectedContacts;

        sendQualitySurveyToSuppliers(selectedContacts, qualitySurveyId)
    }

    render() {
        const { isLoading, suppliersList, actions, manageMembers, type } = this.props;
        const tableOptions = {
            hideSizePerPage: true,
            paginationPosition: 'bottom',
            paginationPanel: this.renderPaginationPanel
        };

        const selectRowProp = {
            clickToSelect: true,
            clickToExpand: true,
        };
        return (
            <Row className="select-supplier-modal">
                {isLoading ?
                    <Spinner />
                    :
                    <Col xs={12} md={12} lg={12} className="list users-list">
                        <Table responsive className="select-supplier-table">
                            <tbody>
                                <BootstrapTable data={ suppliersList }
                                ref='suppliersTable'
                                expandableRow={ this.isExpandableRow }
                                expandComponent={ this.expandComponent.bind(this) }
                                keyField='id'
                                selectRow={ selectRowProp }
                                pagination = { true }
                                options= {tableOptions}
                                search
                                >
                                    <TableHeaderColumn dataField='name'>Fournisseurs</TableHeaderColumn>
                                    <TableHeaderColumn dataField='subsidiary'>Filliale</TableHeaderColumn>
                                </BootstrapTable>
                            </tbody>
                        </Table>
                    </Col>
                }
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        suppliersList: state.form.Suppliers.suppliers.content,
        isLoading: state.form.Suppliers.isLoading
    }
}

function mapDispatchToProps() {
    return (dispatch) => bindActionCreators({ 
        fetchSuppliers,
        sendQualitySurveyToSuppliers
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectSuppliersModal));