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
    const { fields, field, index, dragSource, addChangeSetModify, addChangeSetRemove, maxAboutEntityId } = this.props;
    const status = fields.getAll()[index].status || 'add';
    const apiIndex = maxAboutEntityId.question + index;

    return (
      <li key={apiIndex} className={`question-row question-status-${status.toLowerCase()}`}>
        <div className="question-field">
          <Field
            name={`${field}.content`}
            type="text"
            component={renderInput}
            label={`Question #${index + 1}`}
            onChange={(input) => addChangeSetModify(apiIndex, dragSource)}
            validate={[required]}
          />
        </div>
        <div className="add-question-button">
          <Button
            type="button"
            bsStyle="btn btn-action-button font-icon"
            onClick={() => {
              fields.remove(apiIndex);
              addChangeSetRemove(apiIndex, dragSource);
            }}
          >
            <Glyphicon glyph="remove" />
          </Button>
        </div>
      </li>
    );
  }
}


function mapstateToProps(state) {
  return {
    maxAboutEntityId: state.form.Administration.qualitySurvey.values.maxAboutEntityId,
  };
}

Question = connect(
  mapstateToProps,
  null,
)(Question);


export default StaticBlockWrapperHOC(DraggableContainerWrapperHOC(Question));