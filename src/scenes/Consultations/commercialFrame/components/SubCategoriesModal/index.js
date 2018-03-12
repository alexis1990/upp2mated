import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { addSubCategory, removeSubCategory } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles/style.css'

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
        this.state = {
            onMountLoadselectedSubCategory: [],
            currPage: 1
        };
    }
    
    onMountLoadSelectedCategoryFromStore(nextProps) {
        if(nextProps.categories.length > 0){
            return nextProps.categories
            .map((category) => category.subCategory)
            .map((subCategories) => subCategories.map((subCategory) => subCategory.id))
            .reduce((newSelectedCategory, oldSelectedCategory) => newSelectedCategory.concat(oldSelectedCategory), [])        
        }
    }

    componentWillReceiveProps(nextProps) { 
            const onMountLoadselectedSubCategory = this.onMountLoadSelectedCategoryFromStore(nextProps);
            this.setState({
                onMountLoadselectedSubCategory
            })

    }

    onRowSelect(row, isSelected, e, rowIndex) {
        const { addSubCategory, removeSubCategory, selectedCategoryId, categoryPositionIndex } = this.props;
        const subCategoryId = row.id;

        isSelected ? addSubCategory(row, categoryPositionIndex) : removeSubCategory(subCategoryId, categoryPositionIndex);
    }

    render() {
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect,
            selected: this.state.onMountLoadselectedSubCategory
        };

        let { stateModal, categoryId } = this.props;
        const filteredSubCategories =  subCategories.filter((subCategory) => subCategory.categoryId === categoryId)
        return (
            <Col xs={5} md={9} style={{ padding: 0 }} className="sub-categories">
            <BootstrapTable data={ filteredSubCategories } selectRow={ selectRowProp }>
                <TableHeaderColumn dataField='id' isKey>Numéro de sous catégorie</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Sous Categories</TableHeaderColumn>
            </BootstrapTable>
        </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.form.CF.values.categories,
        categoryId: state.modal.data.categoryId,
        categoryPositionIndex: state.modal.data.categoryPositionIndex
    }
}

function mapDispatchToProps(dispatch){
    return (dispatch) => bindActionCreators({ addSubCategory, removeSubCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (SubCategoriesModal);