import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { bindActionCreators, compose } from 'redux';
import { reduxForm } from 'redux-form';
import { isModalVisible } from '../../../../components/Modal/actions';
import { addContact, fetchSupplier, updateContact } from '../../actions';

export const ASK_INFORMATION_SUPPLIER_MODAL = 'Suppliers.AskInformation';

class ContactFormModal extends React.Component {
  static propTypes = {
    supplierId: PropTypes.string.isRequired,
    contacts: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    contacts: [],
  };

  state = {
    contact: {},
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  getSelectOptions = contacts => contacts.map(contact => ({
    value: contact.id,
    label: contact.name,
  }));

  escFunction = (event) => {
    if (event.keyCode === 27) {
      const { isModalVisible } = this.props;
      isModalVisible(false, ASK_INFORMATION_SUPPLIER_MODAL);
    }
  };

  askInformationsToSupplier = () => {
    const { supplierId } = this.props;
    const contactId = this.state.contact.value;

    console.log(contactId);

    this.props.askInformationsToSupplier(supplierId, contactId);
  };

  render() {
    const { contacts, isModalVisible } = this.props;

    const options = this.getSelectOptions(contacts);
    const { contact } = this.state;
    const value = contact && contact.value;

    return (
      <Row className="ask-information-supplier-modal">
        <Col xs={12} md={12} lg={12} className="list users-list">
          <Col xs={12} md={12} lg={12} className="align-right send-button">
            <Row>
              <Col xs={12} md={12} lg={12}>
                {/*<h3>{isNewContact ? 'Nouveau contact' : `Modification du contact #${contact.id} - ${contact.name}`}</h3>*/}
              </Col>
              <Col xs={3} md={3} lg={3}>
                <span>Selectionner le fournisseur</span>
              </Col>
              <Col xs={9} md={9} lg={9}>
                <Select
                  id="state-select"
                  name="selected-state"
                  ref={(ref) => {
                    this.select = ref;
                  }}
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  autoFocus
                  options={options}
                  simpleValue
                  value={value}
                  onChange={contact => this.setState({ contact })}
                  searchable={this.state.searchable}
                />
              </Col>
            </Row>
            <Row className="buttons-actions">
              <Col lg={6}>
                <Button type="button" bsStyle="btn btn-action-button" onClick={() => isModalVisible(false, ASK_INFORMATION_SUPPLIER_MODAL)}>Annuler</Button>
              </Col>
              <Col lg={6}>
                <Button type="button" bsStyle="btn btn-action-button" onClick={() => this.askInformationsToSupplier()}>Demander les informations à ce contact fournisseur</Button>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  contact: state.form.Suppliers.contact.values,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  isModalVisible,
  addContact,
  updateContact,
  fetchSupplier,
}, dispatch);

export default compose(
  reduxForm({
    form: 'Suppliers.contact',
    initialValues: {
      contactList: [],
    },
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ContactFormModal);
