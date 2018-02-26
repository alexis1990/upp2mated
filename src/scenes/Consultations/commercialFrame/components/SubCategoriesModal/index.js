import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { addSubCategory } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

var subCategories = [{
    id: 1,
    name: "Montage",
    categoryId: 0,
    price: 100
},{
    id: 2,
    name: "Cablage",
    categoryId: 0,
    price: 100
}, {
    id: 3,
    name: "Eprouvette",
    categoryId: 1,
    price: 100
}];

class SubCategoriesModal extends Component {
    constructor(props) {
        super();
        this.onRowSelect = this.onRowSelect.bind(this)
    }
    onRowSelect(row, isSelected, e) {
        const { addSubCategory, selectedCategoryId } = this.props;
        addSubCategory(row);
    }
    
    render() {
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect
        };
        let { stateModal } = this.props;
        let filteredSubCategories;

        if(stateModal.data) {
            filteredSubCategories = subCategories.filter((subCategory)=> subCategory.categoryId === stateModal.data.categoryId)
        }

        return (
            <Col xs={5} md={9} style={{ padding: 0 }}>
            <BootstrapTable data={ filteredSubCategories } selectRow={ selectRowProp }>
                <TableHeaderColumn dataField='id' isKey>Numéro de sous catégorie</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Sous Categories</TableHeaderColumn>
                {/* <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn> */}
            </BootstrapTable>
        </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.form.CF.values.categories,
        stateModal: state.modal
    }
}

function mapDispatchToProps(dispatch){
    return (dispatch) => bindActionCreators({ addSubCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (SubCategoriesModal);