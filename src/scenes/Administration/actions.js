import axios from 'axios'
import * as types from './actionTypes'

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

export function selectedTeamEdition(selectedTeam) {
	return (dispatch, getState) => {
		const teamListState = getState().form.Administration.editUser.values.teamList;
		teamListState.some((member) => member.id === selectedTeam.id) ? dispatch(removeTeamEdition(selectedTeam)) : dispatch(addTeamEdition(selectedTeam));
	}
}

export function removeTeamEdition(member) {
	return {
		type: types.REMOVE_TEAM_EDITION,
		payload: member
	}
}

export function addTeamEdition(member) {
	return {
		type: types.ADD_TEAM_EDITION,
		payload: member
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

export function editUser(user, history) {
	return (dispatch, getState) => {
		axios.post('/u2m-api/v1/person/', user).then((response) => {
			history.push('/administration/')
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function selectedMemberCreation(selectedMember) {
	return (dispatch, getState) => {
		const teamMembersState = getState().form.Administration.createTeam.values.teamMembers;
		teamMembersState.some((member) => member.id === selectedMember.id) ? dispatch(removeMemberCreation(selectedMember)) : dispatch(addMemberCreation(selectedMember));
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

export function selectedMemberEdition(selectedMember) {
	return (dispatch, getState) => {
		const teamMembersState = getState().form.Administration.editTeam.values.teamMembers;
		teamMembersState.some((member) => member.id === selectedMember.id) ? dispatch(removeMemberEdition(selectedMember)) : dispatch(addMemberEdition(selectedMember));
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
		const teamListState = getState().form.Administration.authorization[type].values.teams;
		teamListState.some((item) => item.id === selectedTeam.id) ? dispatch(removeTeamToAuthorizationList(selectedTeam, type)) : dispatch(addTeamToAuthorizationList(selectedTeam, type));
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
		const usersListState = getState().form.Administration.authorization[type].values.users;
		usersListState.some((item) => item.id === selectedUser.id) ? dispatch(removeUserToAuthorizationList(selectedUser, type)) : dispatch(addUserToAuthorizationList(selectedUser, type));
	}
}

export function loadResponsibility(roles) {
	return {
		type: types.LOAD_RESPONSILITIES,
		payload: roles
	}
}

export function getResponsibilities() {
	return (dispatch) => {
		axios.get(`/u2m-api/v1/authorization-type/functions/`).then((responsibilities) => {
			const formattedResponsibilities = responsibilities.map((responsibility) => {{return { name: responsibility, value: responsibility }}});
			dispatch(loadResponsibility(formattedResponsibilities));
		}, (errorResponse) => {
			console.log('ROLES', errorResponse)
		})		
	}
}

export function loadScope(scopes) {
	return {
		type: types.LOAD_SCOPES,
		payload: scopes
	}
}

export function getScopes() {
	return (dispatch) => {
		axios.get(`/u2m-api/v1/authorization-type/scopes/`).then((scopes) => {
			const formattedScopes = scopes.map((scope) => {{return { name: scope, value: scope }}});
			dispatch(loadScope(formattedScopes));
		}, (errorResponse) => {
			console.log('Scopes', errorResponse)
		})		
	}
}

export function postRowAuthorization(rowAuthorization) {
	const rowSelected = rowAuthorization.teams[0]; ///DYNAMICCC !!!!

	axios.post(`/u2m-api/v1/role/${rowSelected.function}/person/${rowSelected.id}`).then((response) => {
		console.log('TEAM AUTHORISATION', response)
	}, (errorResponse) => {
		console.log('TEAM AUTHORISATION ERROR', errorResponse)
	})
}