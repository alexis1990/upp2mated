import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { fetchUserToManage, fetchTeams, selectedTeamCreation, postNewUser, editUser } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import TeamsList from '../../Teams/components/TeamsList/'
import UserCreationForm from '../components/UserCreationForm/'
import Modal from '../../../../../components/Modal/'
import { isModalVisible } from '../../../../../components/Modal/actions'

const isUserIdExist = (userId) => !!userId;

class ManageUser extends Component {
    constructor(){
        super();
        this.state = {
            user: {
                teamList: []
            }
        }
        this.manageUser = this.manageUser.bind(this);
    }

    componentWillMount() {
        const { match, fetchUserToManage } = this.props;
        const userId = match.params.id;
        if(isUserIdExist(userId)){
            fetchUserToManage(userId)
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({user: nextProps.user})
    }

    loadTeams() {
        const { isModalVisible, fetchTeams } = this.props;
        isModalVisible(true);
        fetchTeams();
    }

    manageTeams(values) {
        const { selectedTeamCreation } = this.props;
        selectedTeamCreation(values);
    }

    postNewUser() {
        const { postNewUser, user, history } = this.props;
        postNewUser(user, history);
    }

    editUser() {
        const { editUser, user, history } = this.props;
        editUser(user, history)
    }
    
    manageUser(e) {
        e.preventDefault();
        const { match } = this.props;

        if(isUserIdExist(match)){
            this.editUser();
        } else {
            this.postNewUser();
        }
    }

	render(){

        const { teams, isVisible } = this.props;
        const { user } = this.state;

		return(
            <Col xs={12} md={12} lg={12} className="user">
                <Modal isVisible={ isVisible } component={ <TeamsList checkboxOption isLoading={teams.isLoading}  teams={teams.data} manageTeams={this.manageTeams.bind(this)} teamsSelected={user.teamList} /> } />
                <Form onSubmit={this.manageUser}>
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
                                <TeamsList teams={user.teamList} />
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
        user : state.form.Administration.manageUser.values,
        teams: {
            data: state.form.Administration.teams.data,
            isLoading: state.form.Administration.teams.isLoading
        },
        isVisible: state.modal.mode
	}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({ isModalVisible, fetchTeams, fetchUserToManage, selectedTeamCreation, postNewUser, editUser }, dispatch)
}

export default ManageUser = reduxForm({
    form: 'Administration.manageUser',
    initialValues: {
        teamList: []
    }
})(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUser)))