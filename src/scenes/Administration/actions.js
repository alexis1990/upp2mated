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

export function loadTeamToManage(teamMembers, isLoading) {
	return {
		type: types.LOAD_TEAM_TO_MANAGE,
		payload: {
			data: teamMembers,
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

export function fetchTeamToManage(id) {
	return (dispatch) => {
		dispatch(loadTeamToManage({ teamMembers: [] }, true))

		axios.get(`${'/u2m-api/v1/team/' + id}`).then((team) => {
			dispatch(loadTeamToManage(team, false));
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

export function addTeam(member) {
	return {
		type: types.ADD_TEAM_CREATION,
		payload: member
	}
}

export function removeTeam(member) {
	return {
		type: types.REMOVE_TEAM_CREATION,
		payload: member
	}
}

export function selectedTeamCreation(selectedTeam) {
	return (dispatch, getState) => {
		const teamListState = getState().form.Administration.manageUser.values.teamList;
		teamListState.some((team) => team.id === selectedTeam.id) ? dispatch(removeTeam(selectedTeam)) : dispatch(addTeam(selectedTeam));
	}
}

function deleteATeam(teamId) {
	return {
		type: types.REMOVE_TEAM_LIST,
		payload: teamId
	}
}


export function deleteTeam(teamId) {
	return (dispatch) => {
		axios.delete(`/u2m-api/v1/team/${teamId}`)
		.then((resolve) => dispatch(deleteATeam(teamId)))
		.catch((reject)=> console.log('REJJJJ'))
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

export function loadUserToManage(user, isLoading) {
	return {
		type: types.LOAD_USER_TO_MANAGE,
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
		dispatch(loadUser({ teamList: [] }, true))
		const size = 10;
		axios.get(`/u2m-api/v1/person/${id}`).then((user) => {
			dispatch(loadUser(user, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function fetchUserToManage(id) {
	return (dispatch) => {
		dispatch(loadUserToManage({ teamList: [] }, true))
		const size = 10;
		axios.get(`/u2m-api/v1/person/${id}`).then((user) => {
			dispatch(loadUserToManage(user, false));
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

export function removeMember(member) {
	return {
		type: types.REMOVE_MEMBER,
		payload: member
	}
}

export function addMember(member) {
	return {
		type: types.ADD_MEMBER,
		payload: member
	}
}

export function selectedMember(selectedMember) {
	return (dispatch, getState) => {
		const teamMembersState = getState().form.Administration.manageTeam.values.teamMembers;
		teamMembersState.some((member) => member.id === selectedMember.id) ? dispatch(removeMember(selectedMember)) : dispatch(addMember(selectedMember));
	}
}

function deleteAMember(memberId) {
	return {
		type: types.REMOVE_MEMBER_LIST,
		payload: memberId
	}
}


export function deleteMember(memberId) {
	return (dispatch) => {
		axios.delete(`/u2m-api/v1/person/${memberId}`)
		.then((resolve) => dispatch(deleteAMember(memberId)))
		.catch((reject)=> console.log('REJJJJ'))
	}
}