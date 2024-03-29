import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import renderInput from '../../../../../../../../components/Fields/input';
import StaticBlockWrapperHOC from '../../../../../../../../components/DraggableHOC/';
import DraggableContainerWrapperHOC from '../../../../../../../../components/DraggableHOC/components/DraggableElement';
import { required } from '../../../../../../../../utils/inputRules';

class Question extends React.Component {
  render() {
    const { fields, field, index, dragSource, addChangeSetModify, addChangeSetRemove } = this.props;
    const fieldObject = fields.getAll()[index];
    const status = fieldObject.status || 'unchange';
    const changeIndex = fieldObject.questionId;

    return (
      <li key={index} className={`question-row question-status-${status.toLowerCase()}`}>
        <div className="question-field">
          <Field
            name={`${field}.content`}
            type="text"
            component={renderInput}
            label={`Question #${index + 1}`}
            onChange={(input) => addChangeSetModify(changeIndex, dragSource)}
            validate={[required]}
          />
        </div>
        <div className="add-question-button">
          <Button
            type="button"
            bsStyle="btn btn-action-button font-icon"
            onClick={() => {
              fields.remove(index);
              addChangeSetRemove(changeIndex, dragSource);
            }}
          >
            <Glyphicon glyph="remove" />
          </Button>
        </div>
      </li>
    );
  }
}


function mapStateToProps(state) {
  return {
    qualitySurveyForm: state.form.Administration.qualitySurvey.values.qualitySurveyForm,
  };
}

Question = connect(
  mapStateToProps,
  null,
)(Question);


export default StaticBlockWrapperHOC(DraggableContainerWrapperHOC(Question));
