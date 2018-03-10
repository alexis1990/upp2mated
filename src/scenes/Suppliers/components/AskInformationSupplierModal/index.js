import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { bindActionCreators, compose } from 'redux';
import { isModalVisible } from '../../../../components/Modal/actions';
import { askInformationsToSupplier } from '../../actions';

export const ASK_INFORMATION_SUPPLIER_MODAL = 'Suppliers.AskInformation';

class ContactFormModal extends React.Component {
  static propTypes = {
    supplier: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    contacts: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    supplier: {},
    contacts: [],
  };

  state = {
    contactId: -1,
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
    const { supplier, askInformationsToSupplier, isModalVisible } = this.props;
    const { contactId } = this.state;

    askInformationsToSupplier(supplier.id, contactId)
      .then(() => isModalVisible(false, ASK_INFORMATION_SUPPLIER_MODAL));
  };

  render() {
    const { supplier, contacts, isModalVisible } = this.props;
    const { contactId } = this.state;
    const options = this.getSelectOptions(contacts);

    return (
      <Row className="ask-information-supplier-modal">
        <Col xs={12} md={12} lg={12} className="">
          <Row>
            <Col xs={12} md={12} lg={12}>
              <h3>{`Demande d'informations au fournisseur  #${supplier.id} - ${supplier.name}`}</h3>
            </Col>
            <Col xs={3} md={3} lg={3}>
              <span>Selectionner le fournisseur</span>
            </Col>
            <Col xs={9} md={9} lg={9}>
              <Select
                autoFocus
                searchable
                simpleValue
                options={options}
                value={contactId}
                onChange={contactId => this.setState({ contactId })}
              />
            </Col>
          </Row>
          <Row className="buttons-actions">
            <Col lg={6}>
              <Button type="button" bsStyle="btn btn-action-button" onClick={() => isModalVisible(false, ASK_INFORMATION_SUPPLIER_MODAL)}>Annuler</Button>
            </Col>
            <Col lg={6}>
              <Button
                type="button"
                bsStyle="btn btn-action-button"
                disabled={contactId === -1 || contactId === null}
                onClick={() => this.askInformationsToSupplier()}
              >
                Demander les informations à ce contact fournisseur
              </Button>
            </Col>
          </Row>
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
  askInformationsToSupplier,
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(ContactFormModal);
