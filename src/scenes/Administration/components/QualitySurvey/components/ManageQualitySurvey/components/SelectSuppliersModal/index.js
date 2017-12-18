import React, { Component } from 'react'
import { Grid, Tab, Row, Col, Nav, NavItem, ButtonGroup, Button, Glyphicon, Pagination, Table } from 'react-bootstrap'
import { withRouter, Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchSuppliers } from '../../../../../../../Suppliers/actions'
// import TableComponent from '../../../../../../../../components/Table/index'
import ContactsSuppliers from './components/ContactsSuppliers'
import { BootstrapTable, TableHeaderColumn, SizePerPageDropDown } from 'react-bootstrap-table';
import { Field, reduxForm } from 'redux-form'
// import Spinner from '../../../../../../components/Spinner'
import _ from 'lodash'
import './styles/style.css'


const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    clickToExpand: true
};


class SelectSuppliersModal extends Component {
    constructor() {
        super();
        this.state = {
            activePage: 1
        }
        this.handleSelect = this.handleSelect.bind(this);
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
    
    expandComponent(row) {
        return (
            <ContactsSuppliers data={ row.contactPersonList } />
        );
    }

    renderPaginationPanel = (props) => {
        return (
            <Col xs={12} md={12} lg={12}>
                <Row>
                    <Col xs={6} md={6} lg={6} className="page-list-buttons">
                        { props.components.pageList }
                    </Col>
                    <Col xs={6} md={6} lg={6} className="align-right">
                        <Button type="button" bsStyle="btn btn-action-button">Envoyer</Button>
                    </Col>
                </Row>
            </Col>
        );
      }


    render() {
        const { isLoading, suppliersList, actions, manageMembers, type } = this.props;
        const tableOptions = {
            hideSizePerPage: true,
            paginationPosition: 'bottom',
            paginationPanel: this.renderPaginationPanel
        };
        return (
            <Row className="select-supplier-modal">
                {/* {isLoading ?
                    <Spinner />
                    : */}
                    <Col xs={12} md={12} lg={12} className="list users-list">
                        <Table responsive className="select-supplier-table">
                            <tbody>
                                <BootstrapTable data={ suppliersList }
                                expandableRow={ this.isExpandableRow }
                                expandComponent={ this.expandComponent }
                                keyField='id'
                                selectRow={ selectRow }
                                pagination = { true }
                                options= {tableOptions}
                                >
                                    <TableHeaderColumn dataField='name'>Fournisseurs</TableHeaderColumn>
                                    <TableHeaderColumn dataField='subsidiary'>Filliale</TableHeaderColumn>
                                </BootstrapTable>
                            </tbody>
                        </Table>
                        
                    </Col>
                {/* } */}
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        suppliersList: state.form.Suppliers.suppliers.content,
        isLoading: state.form.Administration.users.isLoading
    }
}

function mapDispatchToProps() {
    return (dispatch) => bindActionCreators({ 
        fetchSuppliers
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectSuppliersModal);