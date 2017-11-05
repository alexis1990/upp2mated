import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getResponsibilities, getRole, getScopes, createRole } from '../../actions'
import { Table, Glyphicon, Button, ButtonGroup, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Field, reduxForm, FieldArray } from 'redux-form'
import Select from '../../../../../../components/Fields/select'
import renderInput from '../../../../../../components/Fields/input'
import RenderRights from './components/RenderRights/'
import './styles/style.css'

const isIDExistInUrl = (id) => !!id;
const isRoleExist = (nextProps) => "values" in nextProps.role;

class ManageRoles extends Component {
    constructor() {
        super();

        this.state = {
            role: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (isRoleExist(nextProps)) {
            this.setState({role: nextProps.role.values})
        }
    }

    componentWillMount() {
        const { getResponsibilities, getScopes, match, getRole } = this.props;
        if (isIDExistInUrl(match.params.id)) {
            getRole(match.params.id);
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
        const { role } = this.state;
        return (
            <Form onSubmit={handleSubmit(this.submitRole.bind(this))}>
                <Col xs={12} md={12} lg={12} className="role">
                    <Col xs={6} md={6} lg={6} >
                        <h2>{role.label}</h2>
                        <Col xs={12} md={12} lg={12} >
                            <Field type="text" name="label" withoutLabel placeholder="Nom du rôle" component={renderInput}></Field>
                        </Col>
                        <Col xs={12} md={12} lg={12} >
                            <Field type="text" name="description" withoutLabel placeholder="Description du rôle" component={renderInput}></Field>
                        </Col>
                    </Col>
                    <Col xs={6} md={6} lg={6} >
                        <FieldArray name="authorizationRoleList" component={RenderRights} responsibilities={responsibilities} scopes={scopes} />
                    </Col>
                    <Col xs={12} md={12} lg={12} className="submit-role" >
                        <Button type="submit" bsStyle="action-button">Valider</Button>
                    </Col>
                </Col>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        responsibilities: state.form.Administration.authorization.responsibilities,
        scopes: state.form.Administration.authorization.scopes,
        role : state.form.Administration.manageRoles
    }
}

function mapDispatchToProps() {
    return dispatch => bindActionCreators({ getResponsibilities, getScopes, getRole, createRole }, dispatch)
}

ManageRoles = reduxForm({
    form: 'Administration.manageRoles'
})(ManageRoles);

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoles);