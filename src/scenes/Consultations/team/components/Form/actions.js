import * as types from './actionTypes'

export function addField() {
	const newField = {};
	return {
		type: types.ADD_FIELD,
		payload: newField
	}
}

export function removeField(index) {
	console.log('INNDDDD', index)
	return {
		type: types.REMOVE_FIELD,
		payload: index
	}
}