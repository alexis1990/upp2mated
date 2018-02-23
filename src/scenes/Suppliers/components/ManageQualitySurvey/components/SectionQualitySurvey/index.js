import React from 'react';
import { Col } from 'react-bootstrap';
import { Field, FieldArray } from 'redux-form';
import renderInput from '../../../../../../components/Fields/input';
import Question from '../QuestionQualitySurvey/';

const Section = ({ fields }) => (
  <div>
    {fields.map((section, index) => (
      <li key={index} className="sections">
        <Col lg={12}>
          <Col lg={3}>
            <h4>Section {index + 1}</h4>
          </Col>
          <Col lg={4}>
            <Field
              disabled
              name={`${section}.content`}
              type="text"
              withoutLabel
              component={renderInput}
              placeholder="Nom"
            />
          </Col>
        </Col>
        <FieldArray name={`${section}.questions`} noneButton component={Question} />
      </li>
    ))}
  </div>
);

export default Section;
