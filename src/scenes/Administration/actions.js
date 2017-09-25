import axios from 'axios'
import * as types from './actionTypes'

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