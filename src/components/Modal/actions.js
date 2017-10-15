import * as types from './actionTypes'

export function isModalVisible(mode, name) {
	return {
		type: types.VISIBLE_MODAL,
		payload: { mode: mode, name: name }
	}
}
