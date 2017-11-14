import React, { Component } from 'react'
import { DragSource,DropTarget } from 'react-dnd';
import { addChangeSetQuestion } from '../../actions'
import renderInput from '../../../Fields/input'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Types = {
    QUESTION: 'question'
};

class Questions extends Component {
    constructor(props) {
        super();

        this.moveQuestion= this.moveQuestion.bind(this);
    }
    moveQuestion(dragIndex, hoverIndex) {
        const { fields } = this.props;
        fields.move(dragIndex, hoverIndex);
    }

    addQuestion() {
        const { addChangeSetQuestion, fields } = this.props;
        fields.push({});
        
        const questionId = fields.length;
        addChangeSetQuestion(questionId);
    }

    render(){
        const { fields, meta: { error } } = this.props;        
        return(
            <ul>
            <li className="add-question-row">
                <Button bsStyle="btn btn-action-button" type="button" onClick={this.addQuestion.bind(this)}>
                    Ajouter une question
                </Button>
            </li>
            {fields.map((question, index) => (
                <Question moveQuestion={this.moveQuestion} question={question} index={index} fields={fields} />
            ))}
            {error && <li className="error">{error}</li>}
        </ul>
        )
    }
}

class Question extends Component {
    render() {
        const { question, index, fields, connectDragSource, connectDropTarget } = this.props;
        
        return  connectDragSource (connectDropTarget(
            <li key={index} className="question-row" >
                <div className="question-field">
                    <Field
                        name={`${question}.content`}
                        type="text"
                        component={renderInput}
                        label={`Question #${index + 1}`}
                    />
                </div>
                <div className="add-question-button">
                    <Button
                        type="button"
                        bsStyle="btn btn-action-button font-icon"
                        onClick={() => fields.remove(index)}
                    >
                        <Glyphicon glyph="remove" />
                    </Button>
                </div>
            </li>
        ))
    }
}


function collectDrop(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
    };
  }

function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }

const questionSource = {
    beginDrag(props) {
        return {
			index: props.index
		}
    },
};

const questionTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

        if (dragIndex === hoverIndex) {
			return
        }
        
		props.moveQuestion(dragIndex, hoverIndex)

        monitor.getItem().index = hoverIndex
    }
};


Question = DragSource(Types.QUESTION, questionSource, collect) (DropTarget(Types.QUESTION, questionTarget, collectDrop) (Question));

function mapStateToProps () {
    return {

    }
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		addChangeSetQuestion
	}, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (Questions);