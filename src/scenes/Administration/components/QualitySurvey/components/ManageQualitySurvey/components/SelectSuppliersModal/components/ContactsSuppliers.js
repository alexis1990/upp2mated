import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { TableHeaderColumn, BootstrapTable } from 'react-bootstrap-table'
import { manageSuppliersChoosedToFillQS } from '../../../../../actions'
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux' 


class ContactsSuppliers extends Component {
    onRowSelect(row, isSelected, e) {
        const { manageSuppliersChoosedToFillQS } = this.props;
        manageSuppliersChoosedToFillQS(row)
    }
    render() {
        const {data} = this.props;
        if (this.props.data) {
            return (
                <div>
                <BootstrapTable 
                    data={data}
                    className="unfolded-table"
                    selectRow = {{
                        mode: 'checkbox',
                        clickToSelect: true,
                        onSelect: this.onRowSelect.bind(this),
                        clickToExpand: true
                    }}
                    >
                    <h5>Contacts</h5>
                    <TableHeaderColumn thStyle={{display: "none"}} row='0' dataField='id' isKey>Product ID</TableHeaderColumn>
                    <TableHeaderColumn thStyle={{display: "none"}} row='1' dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn thStyle={{display: "none"}} row='1' dataField='email'>Email</TableHeaderColumn>
                </BootstrapTable>
                </div>
            );
        } else {
            return (<p>?</p>);
        }
    }
  }

    function mapStateToProps() {
        return {}
    }

    function mapDispatchToProps() {
        return (dispatch) => bindActionCreators({manageSuppliersChoosedToFillQS}, dispatch)
    }

export default connect (mapStateToProps, mapDispatchToProps) (ContactsSuppliers);