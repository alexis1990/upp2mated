import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import renderInput from '../Fields/input'
import { addChangeSet } from './actions'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray,  arrayPush, arrayMove, arrayRemove, arraySplice } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles/style.css'


const StaticBlockWrapperHOC = (ComponentToWrap) => {
    class renderStaticBlock extends Component {
        constructor() {
            super();
            this.moveContainer = this.moveContainer.bind(this);
            this.insertContainer = this.insertContainer.bind(this);
        }

        insertContainer(dragIndex, hoverIndex, oldFields, valueSource) {
            const { fields } = this.props;
            fields.insert(hoverIndex, valueSource)
            oldFields.remove(dragIndex)
        }

        moveContainer(dragIndex, hoverIndex) {
            const { fields } = this.props;
            fields.move(dragIndex, hoverIndex)
        }

        addContainer() {
            const { fields, addChangeSet, dragSource } = this.props;
            const containerId = fields.length;

            fields.push({});
            addChangeSet(containerId, dragSource, "ADD");
        }

        addChangeSetModify(fieldId, types) {
            const { addChangeSet } = this.props;
            addChangeSet(types, fieldId, "MODIFY");
        }

        addChangeSetRemove(fieldId, types) {
            const { addChangeSet } = this.props;
            addChangeSet(types, fieldId, "REMOVE");
        }

        render() {
            const { fields, dragSource, dropTarget, componentToDrag, parentId, noneButton, meta: { error, submitFailed } } = this.props;
            return (
                <ul> {
                        noneButton ? 
                        <li className="add-section-row">
                        </li >
                        : 
                        <li className="add-section-row">
                            <Button type="button" bsStyle="btn btn-action-button" onClick={this.addContainer.bind(this)}>
                                Nouvelle {dragSource}
                            </Button>
                            {submitFailed && error && <span>{error}</span>}
                        </li >
                    }
                    {
                        fields.map((field, index) => (
                            <ComponentToWrap 
                                dragSource={dragSource} 
                                dropTarget={dropTarget} 
                                moveContainer={this.moveContainer} 
                                parentId={parentId} 
                                insertContainer={this.insertContainer} 
                                addChangeSetModify={this.addChangeSetModify.bind(this, dragSource)}
                                addChangeSetRemove={this.addChangeSetRemove.bind(this, dragSource)} 
                                field={field} 
                                index={index} 
                                fields={fields} 
                            />
                        ))
                    }
                </ul >
            )
        }
    }

    function mapStateToProps(state) {
        return {}
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            dispatch,
            addChangeSet
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(renderStaticBlock);
}


export default StaticBlockWrapperHOC;