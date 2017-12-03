import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import renderInput from '../../../Fields/input'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findDOMNode } from 'react-dom';


const DraggableContainerWrapperHOC = (ComponentToWrap) => {
    
    class DragContainer extends Component {
        render() {
            const { connectDragSource, connectDropTarget, field, index, fields } = this.props;
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
                index: props.index,
                parentId: props.parentId,
                field: props.field,
                fields: props.fields,
                value: props.fields.get(props.index)
            }
        },
    };

    const sectionTarget = {
        canDrop(props, monitor) {
            const item = monitor.getItem();
            if(item.field !== props.field) {
                return true;
            }
            return false;
        },
        hover(props, monitor, component) {},
        drop (props, monitor, component) {
            const dragIndex = monitor.getItem().index;
            const hoverIndex = props.index;
            const dragSource = monitor.getItem().field;
            const dropTarget = props.field;
            const parentIdSource = monitor.getItem().parentId;
            const parentIdTarget = props.parentId;
            const oldFields = monitor.getItem().fields;
            const itemSource = monitor.getItem().value;
            const isDragSourceEqualToDropTarget = (dragSource, dropTarget) => dragSource === dropTarget;
            const isParentIndexSourceEqualToParentIndexTarget = (parentIdSource, parentIdTarget) => parentIdSource === parentIdTarget;
            
            if(isDragSourceEqualToDropTarget(dragSource, dropTarget)) {
                return;
            } else {
                if (isParentIndexSourceEqualToParentIndexTarget(parentIdSource, parentIdTarget)) {
                    props.moveContainer(dragIndex, hoverIndex)
                } else {
                    props.insertContainer(dragIndex, hoverIndex, oldFields, itemSource) 
                }                         
            }
        }
    };

    DragContainer = 
        DragSource((props) => props.dragSource, sectionSource, collect)
        (DropTarget((props) => props.dropTarget, sectionTarget, collectDrop)
    (DragContainer));

    return DragContainer;
}

export default DraggableContainerWrapperHOC;