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

		axios.get(`${'/u2m-api/v1/team/' + id }`).then((team) => {
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
	console.log('ADD')
	return {
		type: types.ADD_TEAM_CREATION,
		payload: member
	}
}

export function removeTeamCreation(member) {
	console.log('REMOVE')
	return {
		type: types.REMOVE_TEAM_CREATION,
		payload: member
	}
}

export function selectedTeamCreation(selectedTeam) {
	console.log('okokokokok')
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
	console.log('REMOVE')
	return {
		type: types.REMOVE_MEMBER_CREATION,
		payload: member
	}
}

export function addMemberCreation(member) {
	console.log('ADD')
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
	console.log('REMOVE')
	return {
		type: types.REMOVE_MEMBER_EDITION,
		payload: member
	}
}

export function addMemberEdition(member) {
	console.log('ADD', member)
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
export function addTeamToTenant(team) {
	return {
		type: types.ADD_TEAM_TENANT,
		payload: team
	}
}

export function removeTeamToTenant(team) {
	return {
		type: types.REMOVE_TEAM_TENANT,
		payload: team
	}
}

export function selectedTeamTenant(selectedTeam) {
	return (dispatch, getState) => {
		const teamListState = getState().form.Administration.authorization.tenant.values.teams;
		teamListState.some((team) => team.id === selectedTeam.id) ? dispatch(removeTeamToTenant(selectedTeam)) : dispatch(addTeamToTenant(selectedTeam));
	}
}

export function addUserToTenant(user) {
	return {
		type: types.ADD_USER_TENANT,
		payload: user
	}
}

export function removeUserToTenant(user) {
	return {
		type: types.REMOVE_USER_TENANT,
		payload: user
	}
}

export function selectedUserTenant(selectedUser) {
	return (dispatch, getState) => {
		const usersListState = getState().form.Administration.authorization.tenant.values.users;
		usersListState.some((user) => user.id === selectedUser.id) ? dispatch(removeUserToTenant(selectedUser)) : dispatch(addUserToTenant(selectedUser));
	}
}

export function postRowAuthorization(rowAuthorization) {
	const rowSelected =  rowAuthorization.teams[0];

	axios.post(`/u2m-api/v1/role/${rowSelected.function}/person/${rowSelected.id}`).then((response) => {
		console.log('TEAM AUTHORISATION', response)
	}, (errorResponse) => {
		console.log('TEAM AUTHORISATION ERROR', errorResponse)
	})
}