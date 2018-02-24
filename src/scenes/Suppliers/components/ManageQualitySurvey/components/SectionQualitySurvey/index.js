import React from 'react';
import { FieldArray } from 'redux-form';
import Question from '../QuestionQualitySurvey/';

const Section = ({ fields }) => (
  <ul>
    {fields.map((section, index) => (
      <li key={index} className="sections">
        <h3>{fields.get(index).content}</h3>
        <FieldArray name={`${section}.questions`} noneButton component={Question} />
      </li>
    ))}
  </ul>
);

export default Section;
