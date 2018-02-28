import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {connect} from 'react-redux'

const ContactsSuppliers = ({ handleRowSelect, supplier, onSelectAll}) => {
    const selectRowProps = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: handleRowSelect,
        clickToExpand: true,
        onSelectAll: onSelectAll
    };
    return (
        <div>
            <BootstrapTable 
                data={supplier.contactPersonList}
                className="contacts-table"
                selectRow = {selectRowProps}
                >
                <h5>Contacts</h5>
                <TableHeaderColumn thStyle={{display: "none"}} row='0' dataField='id' isKey>Product ID</TableHeaderColumn>
                <TableHeaderColumn thStyle={{display: "none"}} row='1' dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn thStyle={{display: "none"}} row='1' dataField='email'>Email</TableHeaderColumn>
            </BootstrapTable>
        </div>
    )
};

function mapStateToProps() {
    return {}
}

export default connect (mapStateToProps) (ContactsSuppliers);