import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import renderInput from '../../../../components/Fields/input';
import { isModalVisible } from '../../../../components/Modal/actions';
import ContactListForm from './ContactListForm';

export const CONTACT_FORM_MODAL = 'Suppliers.Contact';
const required = value => (value ? undefined : ' ');

class ContactFormModal extends React.Component {
  static propTypes = {
    supplierId: PropTypes.number.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      const { isModalVisible } = this.props;
      isModalVisible(false, CONTACT_FORM_MODAL);
    }
  };

  saveOrUpdateContact = (form) => {
    const { addContact, supplierId, } = this.props;

    console.log(form);
    if (form.id) {
      //update
    } else {
      addContact(supplierId, form);
    }
  };

  render() {
    const { handleSubmit, isModalVisible } = this.props;

    return (
      <Row className="contact-form-modal">
        <Col xs={12} md={12} lg={12} className="list users-list">
          <Col xs={12} md={12} lg={12} className="align-right send-button">
            <Form onSubmit={handleSubmit(this.saveOrUpdateContact.bind(this))}>
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <h3>Nouveau contact</h3>
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <Field name="name" label="nom" component={renderInput} validate={[required]} />
                  <Field name="email" label="email" component={renderInput} validate={[required]} />
                  <Field name="jobPosition" label="Poste" component={renderInput} />
                  <Field name="organization" label="Organisation" component={renderInput} />
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <FieldArray name="contactList" noneButton component={ContactListForm} />
                </Col>
              </Row>
              <Row className="buttons-actions">
                <Col lg={6}>
                  <Button type="button" bsStyle="btn btn-action-button" onClick={() => isModalVisible(false, CONTACT_FORM_MODAL)}>Annuler</Button>
                </Col>
                <Col lg={6}>
                  <Button type="submit" bsStyle="btn btn-action-button">Sauvegarder</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  isModalVisible,
}, dispatch);

export default compose(
  reduxForm({
    form: 'Suppliers.Contact',
    initialValues: {
      contactList: [],
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ContactFormModal);
