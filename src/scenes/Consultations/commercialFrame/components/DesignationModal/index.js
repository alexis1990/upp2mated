import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { addDesignation, removeDesignation } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles/style.css'

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
        this.state = {
            selectedDesignation: []
        }
    }

    onMountLoadSelectedCategoryFromStore(nextProps) {
        if(nextProps.categories.length > 0){
            return nextProps.categories
            .map((category) => category.subCategory)
            .map((subCategories) => subCategories.map((subCategory) => subCategory.designations))
            .reduce((newSelectedDesignation, oldSelectedDesignation) => newSelectedDesignation.concat(oldSelectedDesignation), [])
            .reduce((newSelectedDesignation, oldSelectedDesignation) => newSelectedDesignation.concat(oldSelectedDesignation), [])
            .map((designation) => designation.id)
        }
    }

    componentWillReceiveProps(nextProps) { 
            const onMountLoadSelectedDesignation = this.onMountLoadSelectedCategoryFromStore(nextProps);
            console.log('onMountLoadSelectedDesignation', onMountLoadSelectedDesignation)
            this.setState({
                selectedDesignation : onMountLoadSelectedDesignation
            })

    }

    onRowSelect(row, isSelected, e) {
        const { addDesignation, removeDesignation, parentsCategories } = this.props;
        isSelected ? addDesignation(row, parentsCategories) : removeDesignation(row, parentsCategories) ;
    }
    
    render() {
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect,
            selected: this.state.selectedDesignation
        };
        const { categoryId, subCategoryId } = this.props;
        // const filteredDesignations =  designations.filter((designation) => designation.categoryId === stateModal.data.categoryId )
        //TODO ADD TO DESIGNATION : SUB CATEGORY ID
        return (
            <Col xs={5} md={9} style={{ padding: 0 }} className="designation-modal">
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
        categories: state.form.CF.values.categories,
        parentsCategories: state.modal.data,
    }
}

function mapDispatchToProps(dispatch){
    return (dispatch) => bindActionCreators({ addDesignation, removeDesignation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (DesignationModal);