import * as types from './actionTypes'

export function nextPage(id) {
  console.log('IIIIIKKKKK', id)
  return {
		type: types.NEXT_PAGE,
		payload: id
	}
}
