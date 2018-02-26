import React from 'react';
import { FieldArray } from 'redux-form';
import Question from '../QuestionQualitySurvey/';

const Section = ({ fields }) => (
  <ul>
    {fields.map((section, index) => {
      const fieldObject = fields.getAll()[index];
      const status = fieldObject.status || 'unchange';
      return (
        <li key={index} className={`sections section-status-${status.toLowerCase()}`}>
          <h3>{fields.get(index).content}</h3>
          <FieldArray name={`${section}.questions`} noneButton component={Question} />
        </li>
      )
    })}
  </ul>
);

export default Section;
