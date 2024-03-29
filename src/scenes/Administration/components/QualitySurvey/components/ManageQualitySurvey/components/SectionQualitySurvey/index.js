import React from 'react';
import { Button, Col, Glyphicon } from 'react-bootstrap';
import { Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import renderInput from '../../../../../../../../components/Fields/input';
import StaticBlockWrapperHOC from '../../../../../../../../components/DraggableHOC/';
import DraggableContainerWrapperHOC from '../../../../../../../../components/DraggableHOC/components/DraggableElement';
import { required } from '../../../../../../../../utils/inputRules';
import Question from '../QuestionQualitySurvey/';

class Section extends React.Component {
  render() {
    const { fields, field, index, addChangeSetModify, addChangeSetRemove, types } = this.props;
    const fieldObject = fields.getAll()[index];
    const status = fieldObject.status || 'unchange';
    const changeIndex = fieldObject.sectionId;

    return (
      <li key={index} className={`sections section-status-${status.toLowerCase()}`}>
        <div className="trash-row">
          <Button
            type="button"
            bsStyle="btn btn-action-button font-icon"
            onClick={() => {
              fields.remove(index);
              addChangeSetRemove(changeIndex, types);
            }}
          >
            <Glyphicon glyph="remove" />
          </Button>
        </div>
        <Col lg={12} className={`section-status-${field.status}`}>
          <Col lg={3}>
            <h4>Section {index + 1}</h4>
          </Col>
          <Col lg={4}>
            <Field
              name={`${field}.content`}
              type="text"
              withoutLabel
              component={renderInput}
              placeholder="Nom"
              onChange={(input) => addChangeSetModify(changeIndex, types)}
              validate={[required]}
            />
          </Col>
        </Col>
        <FieldArray name={`${field}.questions`} parentId={index} dragSource="QUESTION" dropTarget="QUESTION" component={Question} />
      </li>
    );
  }
}

function mapstateToProps(state) {
  return {
    qualitySurveyForm: state.form.Administration.qualitySurvey.values.qualitySurveyForm,
  };
}

Section = connect(
  mapstateToProps,
  null,
)(Section);

export default StaticBlockWrapperHOC(DraggableContainerWrapperHOC(Section));
