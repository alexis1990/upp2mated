import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getResponsibilities, getRole, getScopes, createRole } from '../../actions'
import { Table, Glyphicon, Button, ButtonGroup, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Field, reduxForm, FieldArray } from 'redux-form'
import Select from '../../../../../../components/Fields/select'
import renderInput from '../../../../../../components/Fields/input'

const renderMembers = ({ member, index, fields, responsibilities, scopes }) => (
    <div>
        <Button type="button" bsStyle="action-button" onClick={() => fields.push({})}>
            Add Member
        </Button>
        {fields.map((member, index) => (
            <div >
                <Col xs={12} md={12} lg={12} >
                    <Field componentClass="select" options={responsibilities} withoutLabel name={`${member}.authorizationType`} component={Select}></Field>
                </Col>
                <Col xs={12} md={12} lg={12} >
                    <Field componentClass="select" options={scopes} withoutLabel name={`${member}.authorizationScopeType`} component={Select}></Field>
                </Col>
            </div>
        ))
        }
    </div>
)

const isIDExistInUrl = (id) => !!id;

class ManageRoles extends Component {
    constructor() {
        super();

        this.state = {
            role: {}
        }
    }
    componentWillMount() {
        const { getResponsibilities, getScopes, match, getRole } = this.props;
        if (isIDExistInUrl(match.params.id)) {
            getRole(match.params.id);
            // this.setState({ role: role })
        }
        getResponsibilities();
        getScopes();
    }
    submitRole(values) {
        const { createRole } = this.props;
        createRole(values);
    }
    render() {
        const { responsibilities, scopes, fields, handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.submitRole.bind(this))}>
                <Col xs={12} md={12} lg={12} >
                    <Col xs={6} md={6} lg={6} >
                        <Col xs={12} md={12} lg={12} >
                            <Field type="text" name="label" withoutLabel placeholder="Nom du rôle" component={renderInput}></Field>
                        </Col>
                        <Col xs={12} md={12} lg={12} >
                            <Field type="text" name="description" withoutLabel placeholder="Description du rôle" component={renderInput}></Field>
                        </Col>
                    </Col>
                    <Col xs={6} md={6} lg={6} >
                        <FieldArray name="authorizationRoleList" component={renderMembers} responsibilities={responsibilities} scopes={scopes} />
                    </Col>
                </Col>
                <Col xs={12} md={12} lg={12} >
                    <Button type="submit" bsStyle="action-button">Valider</Button>
                </Col>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    console.log('ROLLLLLLLL', state)
    return {
        responsibilities: state.form.Administration.authorization.responsibilities,
        scopes: state.form.Administration.authorization.scopes,
    }
}

function mapDispatchToProps() {
    return dispatch => bindActionCreators({ getResponsibilities, getScopes, getRole, createRole }, dispatch)
}

ManageRoles = reduxForm({
    form: 'Administration.manageRoles'
})(ManageRoles);

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoles);