import * as types from './actionTypes'

export function nextPage(history, path, stepId) {
  	return (dispatch) => {
  		history.push((path + (parseInt(stepId) + 1)).toString())
  	}
}

export function previousPage(history, path, stepId) {
  	return (dispatch) => {
  		history.push((path + (parseInt(stepId) + 1)).toString())
  	}
}
