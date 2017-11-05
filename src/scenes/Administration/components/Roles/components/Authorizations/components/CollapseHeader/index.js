import React, { Component } from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { bindActionCreators, compose } from 'redux'
import { isModalVisible } from '../../../../../../../../components/Modal/actions'
import Select from '../../../../../../../../components/Fields/select'
import renderInput from '../../../../../../../../components/Fields/input'
import { getRoles } from '../../../../actions'

const findRoleSelected = (roles, role) => roles.find((eachRole) => eachRole.id === parseInt(role.values.id));

class CollapseHeader extends Component {
    componentWillMount(){
        const { getRoles } = this.props;
        getRoles();
    }
	render() {
        const { roles, role } = this.props;
		return (
			<div>
                <Col xs={6} md={6} lg={6} >
				    <Field componentClass="select" options={roles} withoutLabel name="id" placeholder="Choisissez un rôle" component={Select}></Field>
                </Col>
                <Col xs={6} md={6} lg={6} >
                    { role && role.values ? findRoleSelected(roles, role).description : ''}
                </Col>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
        roles: state.form.Administration.authorization.roles,
        form: ownProps.form
    }
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ isModalVisible, getRoles }, dispatch)
}

CollapseHeader = compose(
    connect(mapStateToProps, mapDispatchToProps), 
    reduxForm({destroyOnUnmount: false, asyncBlurFields: []})
)
(CollapseHeader);

export default CollapseHeader;