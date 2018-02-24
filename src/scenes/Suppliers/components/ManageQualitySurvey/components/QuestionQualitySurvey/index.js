import React from 'react';
import { Field } from 'redux-form';
import renderInput from '../../../../../../components/Fields/input';
import { required } from '../../../../../../utils/inputRules';

const Question = ({ fields }) => (
  <ul>
    {fields.map((question, index) => (
      <li key={index} className="question-row">
        <div className="question-field">
          <h4>{fields.get(index).content}</h4>
        </div>
        <ul>
          <li key={index} className="answer-row">
            <div className="answer-field">
              <Field
                name={`${question}.answer.answer`}
                type="text"
                component={renderInput}
                label="Réponse"
                validate={[required]}
              />
            </div>
          </li>
        </ul>
      </li>
    ))}
  </ul>
);

export default (Question);
