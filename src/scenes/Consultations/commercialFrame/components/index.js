import React, { Component } from 'react'
import { Grid, Row, Col, Table, Button, Glyphicon } from 'react-bootstrap'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderInput from '../../../../components/Fields/input'
import { isModalVisible } from '../../../../components/Modal/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Sign extends Component {
    addDesignation() {
        const { isModalVisible, categoryId, subCategoryId } = this.props;
        isModalVisible(true, 'designations', { categoryId, subCategoryId });
    }
    render() {
        const { categoryId, subCategoryId, subCategory } = this.props;
        return (
            <Col xs={5} md={12} className="sub-category-block">
                <Col xs={5} md={4} className="sub-category">
                    <Field type="text" disabled={true} name={`categories[${categoryId}].subCategory[${subCategoryId}].name`} placeholder="Nom" component={renderInput}>Nom</Field>
                    <Button onClick={this.addDesignation.bind(this)} bsStyle="action-button font-icon">
                        <Glyphicon glyph="plus" />
                    </Button>
                </Col>
                <Col xs={7} md={8} className="designations">
                    {subCategory.designations && subCategory.designations.map((designation, designationId) =>
                        <Col xs={7} md={12}>
                            <Col xs={5} md={4} className="column">
                                <Col xs={12} md={12}>
                                    <Field type="text" disabled={true} name={`categories[${categoryId}].subCategory[${subCategoryId}].designations[${designationId}].name`} placeholder="Nom" component={renderInput}>Nom</Field>
                                </Col>
                            </Col>
                            <Col xs={5} md={4} className="column">
                                <Col xs={12} md={12}>
                                    <Field type="text" name={`categories[${categoryId}].subCategory[${subCategoryId}].designations[${designationId}].volume`} placeholder="Volume" component={renderInput}>Volume</Field>
                                </Col>
                            </Col>
                            <Col xs={5} md={4} className="column">
                                <Col xs={12} md={12}>
                                    <Field type="text" name={`categories[${categoryId}].subCategory[${subCategoryId}].designations[${designationId}].description`} placeholder="Description" component={renderInput}>Description</Field>
                                </Col>
                            </Col>
                        </Col>
                    )}
                </Col>
            </Col>
        )
    }
}


function mapStateToProps(state) {
    // console.log('INDEXXXXXX', state)
    return {
        stateModal: state.modal
    }
}

function mapDispatchToProps(dispatch) {
    return (dispatch) => bindActionCreators({ isModalVisible }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sign);