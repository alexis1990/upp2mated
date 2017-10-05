import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { fetchUser, fetchTeams, selectedTeamCreation, postNewUser } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import TeamsList from '../../Teams/components/TeamsList/'
import UserCreationForm from '../components/UserCreationForm/'
import Modal from '../../../../../components/Modal/'
import { isModalVisible } from '../../../../../components/Modal/actions'

class CreateUser extends Component {

    loadTeams() {
        const { isModalVisible, fetchTeams } = this.props;
        isModalVisible(true);
        fetchTeams();
    }

    manageTeams(values) {
        const { selectedTeamCreation } = this.props;
        selectedTeamCreation(values);
    }

    postNewUser(e) {
        e.preventDefault();
        const { postNewUser, user, history } = this.props;
        postNewUser(user, history);
    }

	render(){

		const { memberOfTeams, teams, isVisible } = this.props;
		return(
            <Col xs={12} md={12} lg={12} className="user">
                <Modal isVisible={ isVisible } component={ <TeamsList checkboxOption isLoading={teams.isLoading}  teams={teams.data} manageTeams={this.manageTeams.bind(this)} /> } />
                <Form onSubmit={this.postNewUser.bind(this)}>
                    <Col xs={6} md={6} lg={6}>
                        <UserCreationForm />
                    </Col>
                    <Col xs={6} md={6} lg={6}>
                        <Row>
                            <Col xs={9} md={9} lg={9}>
                                <h4>Equipes: </h4>
                            </Col>
                            <Col xs={3} md={3} lg={3}>
                                <Button onClick={ this.loadTeams.bind(this) } >Gérer les équipes</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <TeamsList teams={memberOfTeams} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                        <Button type="submit" className="pull-right">
                            Submit
                        </Button>
                    </Col>
                </Form>
            </Col>
		)
	}
}

function mapStateToProps(state) {
	return {
        memberOfTeams: state.form.Administration.createUser.values.teamList,
        user : state.form.Administration.createUser.values,
        teams: {
            data: state.form.Administration.teams.data,
            isLoading: state.form.Administration.teams.isLoading
        },
        isVisible: state.modal.mode
	}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({ isModalVisible, fetchTeams, selectedTeamCreation, postNewUser }, dispatch)
}

export default CreateUser = reduxForm({
    form: 'Administration.createUser',
    initialValues: {
        teamList: []
    },
    destroyOnUnmount: false
})(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)))