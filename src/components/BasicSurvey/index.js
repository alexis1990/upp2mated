import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import renderInput from '../Fields/input'
import { addChangeSet } from './actions'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles/style.css'


const StaticBlockWrapperHOC = (ComponentToWrap) => {
    class renderStaticBlock extends Component {
        constructor() {
            super();
            this.moveContainer = this.moveContainer.bind(this);
        }

        moveContainer(dragIndex, hoverIndex) {
            const { fields } = this.props;
            fields.move(dragIndex, hoverIndex);
        }

        addContainer() {
            const { fields, addChangeSet, types } = this.props;
            fields.push({})

            const containerId = fields.length;
            addChangeSet(containerId, types);
        }

        render() {
            const { fields, types, componentToDrag, meta: { error, submitFailed } } = this.props;
            return (
                <ul>
                    <li className="add-section-row">
                        <Button type="button" bsStyle="btn btn-action-button" onClick={this.addContainer.bind(this)}>
                            Nouvelle {types}
                        </Button>
                        {submitFailed && error && <span>{error}</span>}
                    </li >
                    {
                        fields.map((field, index) => (
                            <ComponentToWrap types={types} moveContainer={this.moveContainer} field={field} index={index} fields={fields} />
                        ))
                    }
                </ul >
            )
        }
    }

    function mapStateToProps() {
        return {}
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            addChangeSet
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(renderStaticBlock);
}


export default StaticBlockWrapperHOC;