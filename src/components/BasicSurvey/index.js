import React, { Component } from 'react'
import Questions from './components/Questions/'
import { DragSource,DropTarget } from 'react-dnd';
import renderInput from '../Fields/input'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import './styles/style.css'

const Types = {
    SECTION: ' section'
};

class renderSections extends Component {
    constructor() {
        super();
        this.moveSection = this.moveSection.bind(this);
    }
    moveSection(dragIndex, hoverIndex) {
        const {fields} = this.props;
        console.log('dragIndex, hoverIndex', dragIndex, hoverIndex)
        fields.move(dragIndex, hoverIndex);
    }
    render() {
        const { fields, meta: { error, submitFailed }} = this.props;
        return (
            <ul>
                <li className="add-section-row">
                    <Button type="button" bsStyle="btn btn-action-button" onClick={() => fields.push({})}>
                        Nouvelle Section
                    </Button>
                    {submitFailed && error && <span>{error}</span>}
                </li >
                {
                    fields.map((section, index) => (
                        <Section moveSection={this.moveSection} section={section} index={index} fields={fields} />
                    ))
                }
            </ul >
        )
    }
}

class Section extends Component {
    render() {
        const { connectDragSource, connectDropTarget, section, index, fields } = this.props;
        return  connectDragSource (connectDropTarget(
            <li key={index} className="sections" >
                <div className="trash-row">
                    <Button
                        type="button"
                        bsStyle="btn btn-action-button font-icon"
                        onClick={() => fields.remove(index)}
                    >
                        <Glyphicon glyph="remove" />
                    </Button>
                </div>
                <Col lg={12}>
                    <Col lg={3}>
                        <h4>Section {index + 1}</h4>
                    </Col>
                    <Col lg={4}>
                        <Field
                            name={`${section}.content`}
                            type="text"
                            withoutLabel
                            component={renderInput}
                            placeholder="Nom"
                        />
                    </Col>
                </Col>
                <FieldArray name={`${section}.questions`} component={Questions} />
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

const sectionSource = {
    beginDrag(props) {
        return {
			index: props.index
		}
    },
};

const sectionTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

        if (dragIndex === hoverIndex) {
			return
        }
        
		props.moveSection(dragIndex, hoverIndex)

        monitor.getItem().index = hoverIndex
    }
};

Section = DragSource(Types.SECTION, sectionSource, collect) (DropTarget(Types.SECTION, sectionTarget, collectDrop) (Section));

export default renderSections;