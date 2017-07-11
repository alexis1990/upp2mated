import * as types from './actionTypes'

export function addProvidersField() {
	const newField = {};
	return {
		type: types.ADD_PROVIDERS_FIELD,
		payload: newField
	}
}

export function removeProvidersField(index) {
	return {
		type: types.REMOVE_PROVIDERS_FIELD,
		payload: index
	}
}