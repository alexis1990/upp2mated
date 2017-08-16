import * as types from './actionTypes'
import axios from '../../../axios.config'
import _ from 'lodash'

export function addTeamField() {
	return {
		type: types.ADD_TEAM_FIELD
	}
}

export function removeTeamField(index) {
	return {
		type: types.REMOVE_TEAM_FIELD,
		payload: index
	}
}

export function addTechField() {
	return {
		type: types.ADD_TECH_FIELD
	}
}

export function removeTechField(index) {
	return {
		type: types.REMOVE_TECH_FIELD,
		payload: index
	}
}

export function fetchTeamUsers() {
	return (dispatch) => {
		dispatch(loadTeamUsers([], true))

		axios.get('/u2m-api/v1/team/').then((users) => {
			dispatch(loadTeamUsers(users, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function loadTeamUsers(users, isLoading) {
	return{
		type: types.LOAD_TEAM_USERS,
		payload: { users: users, isLoading: isLoading }
	}
}

export function submitStep2(teamsMembers, nextPage, history, stepId) {
	let allMembers = [...teamsMembers.tech];
	if(teamsMembers.teamLeader.active){
		allMembers = [...allMembers, teamsMembers.teamLeader];
	}

	const formatedMembers = allMembers.map((member, index) => {
		if (member && member.user) {
			const user = member.user[0];
			return {...member, personId: user.id}
		}
	});

	return (dispatch) => {
		const consultationId = sessionStorage.getItem('consultationId');
		axios.post(`/u2m-api/v1/consultation/${consultationId}/step2`, {consultationPersonList: formatedMembers}).then((users) => {
			nextPage(history, '/consultations/', stepId)
			console.log('SUCCESS', users)
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}
