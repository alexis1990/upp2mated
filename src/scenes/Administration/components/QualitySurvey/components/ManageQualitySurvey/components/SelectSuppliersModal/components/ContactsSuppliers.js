import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { TableHeaderColumn, BootstrapTable } from 'react-bootstrap-table'
import { manageSuppliersChoosedToFillQS } from '../../../../../actions'
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux' 


const ContactsSuppliers = ({ supplierId, handleRowSelect, row}) => {
    const selectRowProps = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: handleRowSelect,
        clickToExpand: true,
    };
    return (
        <div>
            <BootstrapTable 
                data={row.contactPersonList}
                className="unfolded-table"
                selectRow = {selectRowProps}
                >
                <h5>Contacts</h5>
                <TableHeaderColumn thStyle={{display: "none"}} row='0' dataField='id' isKey>Product ID</TableHeaderColumn>
                <TableHeaderColumn thStyle={{display: "none"}} row='1' dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn thStyle={{display: "none"}} row='1' dataField='email'>Email</TableHeaderColumn>
            </BootstrapTable>
        </div>
    )
}

function mapStateToProps() {
    return {}
}

export default connect (mapStateToProps) (ContactsSuppliers);