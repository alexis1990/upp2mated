import * as types from './actionTypes'

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