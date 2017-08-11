import * as types from './actionTypes'
import axios from '../../../axios.config'
import _ from 'lodash'

export function addTeamField() {
	const newField = {};
	return {
		type: types.ADD_TEAM_FIELD,
		payload: newField
	}
}

export function removeTeamField(index) {
	return {
		type: types.REMOVE_TEAM_FIELD,
		payload: index
	}
}

export function addTechField() {
	const newField = {};
	return {
		type: types.ADD_TECH_FIELD,
		payload: newField
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
		console.log('DATTTTT', errorResponse)
		})
	}
}

export function loadTeamUsers(users, isLoading) {
	return{
		type: types.LOAD_TEAM_USERS,
		payload: { users: users, isLoading: isLoading }
	}
}

export function submitStep2(teamsMembers) {
	const formatedMembers = _.concat(teamsMembers.commercial, teamsMembers.tech, teamsMembers.teamLeader)
													.forEach((member, index) => {
														console.log('MEMBERSSSS', member)
														if (member && member.user) {
															member.user = _.map(member.user, _.property('id'))[0]
														}
													});
	console.log('formatedMembers', formatedMembers)
	// return (dispatch) => {
	// 	console.log('teamsMembers', teamsMembers);
	// 	axios.post('/u2m-api/v1/team/', teamsMembers).then((users) => {
	//
	// 	}, (errorResponse) => {
	// 	console.log('DATTTTT', errorResponse)
	// 	})
	// }
}
