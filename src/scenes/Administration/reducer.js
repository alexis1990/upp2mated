import initialState from './initialState'
import * as types from './actionTypes'

export function teamsReducer(state= initialState, action= action) {
	switch(action.type) {
		case types.LOAD_TEAMS:
			return { teams: action.payload}
		case types.LOAD_TEAM:
			return { team: action.payload}
		default:
	    	return state;
	}
}