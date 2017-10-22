import axios from 'axios'
import * as types from './actionTypes'
import { arrayPush, arrayRemove } from 'redux-form';

//////// TEAMS

export function loadTeams(teams, isLoading) {
	return {
		type: types.LOAD_TEAMS,
		payload: {
			data: teams,
			isLoading: isLoading
		}
	}
}

export function loadTeam(teamMembers, isLoading) {
	return {
		type: types.LOAD_TEAM,
		payload: {
			data: teamMembers,
			isLoading: isLoading
		}
	}
}

export function fetchTeams() {
	return (dispatch) => {
		dispatch(loadTeams([], true))

		axios.get('/u2m-api/v1/team/').then((teams) => {
			dispatch(loadTeams(teams, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function fetchTeam(id) {
	return (dispatch) => {
		dispatch(loadTeam({ teamMembers: [] }, true))

		axios.get(`${'/u2m-api/v1/team/' + id}`).then((team) => {
			dispatch(loadTeam(team, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function postNewTeam(newTeam, history) {
	return (dispatch, getState) => {
		axios.post('/u2m-api/v1/team/', newTeam).then((response) => {
			history.push('/administration/')
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function editTeam(team, history) {
	return (dispatch) => {
		axios.post('/u2m-api/v1/team/', team).then((response) => {
			history.push('/administration/')
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function addTeamCreation(member) {
	console.log('MMMMM', member);
	return {
		type: types.ADD_TEAM_CREATION,
		payload: member
	}
}

export function removeTeamCreation(member) {
	return {
		type: types.REMOVE_TEAM_CREATION,
		payload: member
	}
}

export function selectedTeamCreation(selectedTeam) {
	return (dispatch, getState) => {
		const teamListState = getState().form.Administration.createUser.values.teamList;
		teamListState.some((team) => team.id === selectedTeam.id) ? dispatch(removeTeamCreation(selectedTeam)) : dispatch(addTeamCreation(selectedTeam));
	}
}

//////// USERS

export function loadUsers(users, isLoading) {
	return {
		type: types.LOAD_USERS,
		payload: { data: users, isLoading: isLoading }
	}
}

export function loadUser(user, isLoading) {
	return {
		type: types.LOAD_USER,
		payload: { data: user, isLoading: isLoading }
	}
}

export function fetchUsers(page) {
	return (dispatch) => {
		dispatch(loadUsers({}, true))
		const size = 10;
		axios.get(`/u2m-api/v1/person/?size=${size}&page=${page}`).then((users) => {
			dispatch(loadUsers(users, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function fetchUser(id) {
	return (dispatch) => {
		dispatch(loadUsers({}, true))
		const size = 10;
		axios.get(`/u2m-api/v1/person/${id}`).then((user) => {
			dispatch(loadUser(user, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function postNewUser(newUser, history) {
	return (dispatch, getState) => {
		axios.post('/u2m-api/v1/person/', newUser).then((response) => {
			history.push('/administration/')
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}


export function removeMemberCreation(member) {
	return {
		type: types.REMOVE_MEMBER_CREATION,
		payload: member
	}
}

export function addMemberCreation(member) {
	return {
		type: types.ADD_MEMBER_CREATION,
		payload: member
	}
}

export function selectedMemberCreation(selectedMember) {
	return (dispatch, getState) => {
		const teamMembersState = getState().form.Administration.createTeam.values.teamMembers;
		teamMembersState.some((member) => member.id === selectedMember.id) ? dispatch(removeMemberCreation(selectedMember)) : dispatch(addMemberCreation(selectedMember));
	}
}

export function removeMemberEdition(member) {
	return {
		type: types.REMOVE_MEMBER_EDITION,
		payload: member
	}
}

export function addMemberEdition(member) {
	return {
		type: types.ADD_MEMBER_EDITION,
		payload: member
	}
}

export function selectedMemberEdition(selectedMember) {
	return (dispatch, getState) => {
		const teamMembersState = getState().form.Administration.editTeam.values.teamMembers;
		teamMembersState.some((member) => member.id === selectedMember.id) ? dispatch(removeMemberEdition(selectedMember)) : dispatch(addMemberEdition(selectedMember));
	}
}

//Authorization & Roles
export function addTeamToAuthorizationList(team, type) {
	return {
		type: types.ADD_TEAM_AUHORIZATION_LIST,
		payload: { ...team, type: type }
	}
}

export function removeTeamToAuthorizationList(team, type) {
	return {
		type: types.REMOVE_TEAM_AUHORIZATION_LIST,
		payload: { ...team, type: type }
	}
}

export function selectedTeamAuthorization(selectedTeam, type) {
	return (dispatch, getState) => {
		const teamListState = getState().form.Administration.authorization[type].teams;
		teamListState.some((item) => item.team.values.id === selectedTeam.id) ? dispatch(removeTeamToAuthorizationList(selectedTeam, type)) : dispatch(addTeamToAuthorizationList(selectedTeam, type));
	}
}

export function addUserToAuthorizationList(user, type) {
	return {
		type: types.ADD_USER_AUHORIZATION_LIST,
		payload: { ...user, type: type }
	}
}

export function removeUserToAuthorizationList(user, type) {
	return {
		type: types.REMOVE_USER_AUHORIZATION_LIST,
		payload: { ...user, type: type }
	}
}

export function selectedUserAuthorization(selectedUser, type) {
	return (dispatch, getState) => {
		const usersListState = getState().form.Administration.authorization[type].users;
		usersListState.some((item) => item.user.values.id === selectedUser.id) ? dispatch(removeUserToAuthorizationList(selectedUser, type)) : dispatch(addUserToAuthorizationList(selectedUser, type));
	}
}

export function loadResponsibilities(responsibilities) {
	return {
		type: types.LOAD_RESPONSIBILITIES,
		payload: responsibilities
	}
}

export function getResponsibilities() {
	return (dispatch) => {
		axios.get(`/u2m-api/v1/authorization-type/functions`).then((responsibilities) => {
			const responsibilitiesOptions = responsibilities.map((responsibility) => (
				{value: responsibility, name: responsibility} 
			))
			dispatch(loadResponsibilities(responsibilitiesOptions));
		}, (errorResponse) => {
			console.log('ROLES', errorResponse)
		})		
	}
}

export function postRowAuthorization(rowSelected) {
	return (dispatch) => {
		axios.post(`/u2m-api/v1/role/${rowSelected.function}/person/${rowSelected.id}`).then((response) => {
			console.log('TEAM AUTHORISATION', response)
		}, (errorResponse) => {
			console.log('TEAM AUTHORISATION ERROR', errorResponse)
		})
	}
}