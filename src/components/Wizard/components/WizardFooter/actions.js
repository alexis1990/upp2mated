import * as types from './actionTypes'

export function nextPage(id) {
	console.log('IDDD', id)
	const nextPage = id + 1;
	return {
		type: types.NEXT_PAGE,
		payload: nextPage.toString()
	}
}

export function previousPage(id) {
	const previousPage = id - 1;
	return {
		type: types.PREVIOUS_PAGE,
		payload: previousPage.toString()
	}
}