import React from 'react';
import { Field } from 'redux-form';
import renderInput from '../../../../../../components/Fields/input';
import { required } from '../../../../../../utils/inputRules';

const Question = ({ fields }) => (
  <div>
    {fields.map((question, index) => (
      <li key={index} className="question-row">
        <h5>Question {index + 1}</h5>
        <div className="question-field">
          <Field
            disabled
            name={`${question}.content`}
            type="text"
            component={renderInput}
            label={`Question #${index + 1}`}
          />
        </div>
        <li key={index} className="answer-row">
          <h5>Réponse {index + 1}</h5>
          <div className="answer-field">
            <Field
              name={`${question}.answer.answer`}
              type="text"
              component={renderInput}
              label={`Answer #${index + 1}`}
              validate={[required]}
            />
          </div>
        </li>
      </li>
    ))}
  </div>
);

export default (Question);
