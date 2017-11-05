import React, { Component } from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { isModalVisible } from '../../../../../../../../components/Modal/actions'
import Select from '../../../../../../../../components/Fields/select'
import renderInput from '../../../../../../../../components/Fields/input'

const RenderRights = ({ member, index, fields, responsibilities, scopes }) => (
    <div>
        <Col lg={12} className="add-rights">
            <Button type="button" bsStyle="action-button" onClick={() => fields.push({})}>
                Ajouter des droits
            </Button>
        </Col>
        <Col lg={12} className="box">
            {fields.map((member, index) => (
                <div >
                    <Col xs={6} md={6} lg={6} >
                        <Field componentClass="select" options={responsibilities} withoutLabel name={`${member}.authorizationType`} component={Select}></Field>
                    </Col>
                    <Col xs={6} md={6} lg={6} >
                        <Field componentClass="select" options={scopes} withoutLabel name={`${member}.authorizationScopeType`} component={Select}></Field>
                    </Col>
                </div>
            ))
            }
        </Col>
    </div>
)

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ isModalVisible }, dispatch)
}

export default connect(null, mapDispatchToProps)(RenderRights);