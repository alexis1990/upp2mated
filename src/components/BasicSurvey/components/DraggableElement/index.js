import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import renderInput from '../../../Fields/input'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const DraggableContainerWrapperHOC = (ComponentToWrap) => {
    class DragContainer extends Component {
        render() {
            const { connectDragSource, connectDropTarget, field, types, index, fields } = this.props;
            return connectDragSource(connectDropTarget(
                <div>
                    <ComponentToWrap {...this.props} />
                </div>
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

            props.moveContainer(dragIndex, hoverIndex)

            monitor.getItem().index = hoverIndex
        }
    };

    DragContainer = DragSource((props) => props.types, sectionSource, collect)(DropTarget((props) => props.types, sectionTarget, collectDrop)(DragContainer));

    return DragContainer;
}

export default DraggableContainerWrapperHOC;