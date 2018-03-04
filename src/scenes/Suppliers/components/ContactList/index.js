import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table, Glyphicon, Button, ButtonGroup, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ContactList = ({ suppliers }) => (
  <Table responsive>
    <thead>
    <tr>
      <th>Nom</th>
      <th>Email</th>
      <th className="align-center">Actions</th>
    </tr>
    </thead>
    <tbody>
    {suppliers.map(contact => (
      <tr key={contact.id}>
        <td width="40%">{contact.name}</td>
        <td width="30%">{contact.email}</td>
        <td className="actions" width="30%">
          <ButtonGroup>
            <Button className="action-button"><Link to={`/administration/roles/${contact.id}`}><Glyphicon glyph="eye-open" /></Link></Button>
            <Button className="action-button"><Link to={`/administration/roles/role/edit/${contact.id}`}><Glyphicon glyph="pencil" /></Link></Button>
            <Button className="action-button"><Link to="/administration/roles/manage/authorizations"><Glyphicon glyph="cog" /></Link></Button>
            <Button className="action-button" onClick={() => console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove" /></Button>
          </ButtonGroup>
        </td>
      </tr>
    ))}
    </tbody>
  </Table>
);

export default ContactList;
