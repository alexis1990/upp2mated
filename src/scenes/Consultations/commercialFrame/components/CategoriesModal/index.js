import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { addCategory, removeCategory } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles/style.css'

var products = [{
    id: 0,
    name: "Mecanique",
    price: 100
}, {
    id: 1,
    name: "Chimie",
    price: 100
}];

class CategoriesModal extends Component {
    constructor(props) {
        super();
        this.onRowSelect = this.onRowSelect.bind(this)
    }
    onRowSelect(row, isSelected, e) {
        const { addCategory, removeCategory } = this.props;
        isSelected ? addCategory(row) : removeCategory(row);
    }

    render() {
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect
        };

        return (
            <Col xs={5} md={9} style={{ padding: 0 }} className="categories-modal">
                <BootstrapTable data={products} selectRow={selectRowProp}>
                    <TableHeaderColumn dataField='id' isKey>Numéro de catégorie</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Categories</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn> */}
                </BootstrapTable>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return (dispatch) => bindActionCreators({ addCategory, removeCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesModal);