import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const ContactList = ({ suppliers }) => (
  <BootstrapTable
    className="supplier-contact-table"
    data={suppliers}
  >
    <TableHeaderColumn width="10%" dataField="name" dataSort>Numéro</TableHeaderColumn>
    <TableHeaderColumn width="10%" dataField="email" isKey dataSort>Type</TableHeaderColumn>
  </BootstrapTable>
);

export default ContactList;
