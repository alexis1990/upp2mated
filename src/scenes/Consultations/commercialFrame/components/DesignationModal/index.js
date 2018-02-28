import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { addDesignation } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

var designations = [{
    id: 0,
    name: "Climatisation",
    price: 100
},{
    id: 1,
    name: "Fixation",
    price: 100
},{
    id: 2,
    name: "Intérieur",
    price: 100
},{
    id: 3,
    name: "XB1224",
    price: 100
},{
    id: 4,
    name: "Extérieur",
    price: 100
},{
    id: 5,
    name: "JIRA",
    price: 100
},{
    id: 6,
    name: "Confluence",
    price: 100
}];

class DesignationModal extends Component {
    constructor(props) {
        super();
        this.onRowSelect = this.onRowSelect.bind(this)
    }
    onRowSelect(row, isSelected, e) {
        const { addDesignation, parentsCategories } = this.props;
        addDesignation(row, parentsCategories);
    }
    
    render() {
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect
        };
        const { categoryId, subCategoryId } = this.props;

        return (
            <Col xs={5} md={9} style={{ padding: 0 }}>
                <BootstrapTable data={ designations } selectRow={ selectRowProp }>
                    <TableHeaderColumn dataField='id' isKey>Numéro de catégorie</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Designation</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn> */}
                </BootstrapTable>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        parentsCategories: state.modal.data,
    }
}

function mapDispatchToProps(dispatch){
    return (dispatch) => bindActionCreators({ addDesignation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (DesignationModal);