import React from 'react';
import { Field } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';
import { required } from '../../../../utils/inputRules';
import renderInput from '../../../../components/Fields/input';

const ContactListForm = ({ fields }) => (
  <Row>
    <Row>
      <Col xs={3} md={3} lg={3}>
        <Button bsStyle="btn btn-action-button" onClick={() => fields.push({})}>Ajouter un numéro</Button>
      </Col>
    </Row>
    {fields.map((contactInfo, index) => (
      <Row key={index}>
        <Col xs={5} md={5} lg={5}>
          <Field
            name={`${contactInfo}.phoneNumber`}
            type="text"
            component={renderInput}
            label="Numéro de téléphone"
            validate={[required]}
          />
        </Col>
        <Col xs={5} md={5} lg={5}>
          <Field
            name={`${contactInfo}.usage`}
            placeholder="portable"
            type="text"
            component={renderInput}
            label="Usage"
            validate={[required]}
          />
        </Col>
      </Row>
    ))}
  </Row>
);

export default ContactListForm;
