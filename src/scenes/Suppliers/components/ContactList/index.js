import PropTypes from 'prop-types';
import React from 'react';
import { Button, ButtonGroup, Col, Glyphicon, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isModalVisible } from '../../../../components/Modal/actions';
import { preloadContact, removeContact } from '../../actions';
import { CONTACT_FORM_MODAL } from '../ContactFormModal';

class ContactList extends React.Component {
  static propTypes = {
    supplierId: PropTypes.number.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      jobPosition: PropTypes.string,
      state: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    contacts: [],
  };

  openContactFormModal = (contact) => {
    const { isModalVisible, preloadContact } = this.props;

    preloadContact(contact);
    isModalVisible(true, CONTACT_FORM_MODAL);
  };

  removeContact = (contact) => {
    const { supplierId, removeContact } = this.props;

    removeContact(supplierId, contact);
  };

  render() {
    const { contacts } = this.props;
    return (
      <Row>
        <Col xs={12} md={12} lg={12}>
          <Row>
            <Col xs={10} md={10} lg={10}><h3>Contacts</h3></Col>
            <Col xs={2} md={2} lg={2}><Button bsStyle="btn btn-action-button pull-right" onClick={() => this.openContactFormModal()}>Ajouter un contact</Button></Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Poste</th>
                <th>Etat</th>
                <th className="align-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.jobPosition}</td>
                  <td>{contact.state}</td>
                  <td className="actions">
                    <ButtonGroup>
                      <Button className="action-button" onClick={() => this.openContactFormModal(contact)}><Glyphicon glyph="pencil" /></Button>
                      <Button className="action-button" onClick={() => this.removeContact(contact)}><Glyphicon glyph="remove" /></Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  isModalVisible,
  preloadContact,
  removeContact,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
