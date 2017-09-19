import initialState from './initialState'
import * as types from './actionTypes'

export function teamsReducer(state= initialState, action= action) {
	switch(action.type) {
		case types.LOAD_TEAMS:
			return { ...state, teams: action.payload}
		case types.LOAD_TEAM:
			return { ...state, team: action.payload}
		default:
	    	return state;
	}
}