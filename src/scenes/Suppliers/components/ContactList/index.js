import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table, Glyphicon, Button, ButtonGroup, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ContactList = ({ suppliers, openModal }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Email</th>
        <th>Poste</th>
        <th className="align-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {suppliers.map(contact => (
        <tr key={contact.id}>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>{contact.jobPosition}</td>
          <td className="actions">
            <ButtonGroup>
              <Button className="action-button"><Link to={`/administration/roles/${contact.id}`}><Glyphicon glyph="eye-open" /></Link></Button>
              <Button className="action-button" onClick={() => openModal(contact)}><Glyphicon glyph="pencil" /></Button>
              <Button className="action-button"><Link to="/administration/roles/manage/authorizations"><Glyphicon glyph="cog" /></Link></Button>
              <Button className="action-button" onClick={() => console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove" /></Button>
            </ButtonGroup>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

ContactList.propTypes = {
  suppliers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    jobPosition: PropTypes.string,
  })),
};

ContactList.defaultProps = {
  suppliers: {},
};

export default ContactList;
