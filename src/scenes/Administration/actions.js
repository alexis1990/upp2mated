import axios from 'axios'
import * as types from './actionTypes'

export function loadTeams(teams, isLoading) {
	return {
		type: types.LOAD_TEAMS,
		payload: { data: teams, isLoading: isLoading }
	}
}

export function loadTeam(team, isLoading) {
	return {
		type: types.LOAD_TEAM,
		payload: { data: team, isLoading: isLoading }
	}
}

export function loadUsers(users, isLoading) {
	return {
		type: types.LOAD_USERS,
		payload: { data: users, isLoading: isLoading }
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
		dispatch(loadTeam({}, true))

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

export function removeMember(member) {
	console.log('REMOVE')
	return {
		type: types.REMOVE_MEMBER,
		payload: member
	}
}

export function addMember(member) {
	console.log('ADD')
	return {
		type: types.ADD_MEMBER,
		payload: member
	}
}

export function selectedMember(member) {
	return (dispatch, getState) => {
		const teamMembersState = getState().form.Administration.createTeam.values.teamMembers;
		teamMembersState.includes(member) ? dispatch(removeMember(member)) : dispatch(addMember(member));
	}
}