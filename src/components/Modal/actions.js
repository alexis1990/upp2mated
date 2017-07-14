import * as types from './actionTypes'

export function isModalVisible(mode) {
	return {
		type: types.VISIBLE_MODAL,
		payload: mode
	}
}
