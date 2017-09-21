import initialState from './initialState'
import * as types from './actionTypes'

export function administationReducer(state= initialState, action= action) {
	// console.log('ACTIONNNNNN', action)
	switch(action.type) {
		case types.LOAD_TEAMS:
			return { ...state, teams: action.payload}
		case types.LOAD_TEAM:
			return { ...state, team: action.payload}
		case types.LOAD_USERS:
			return { ...state, users: action.payload}
		case types.ADD_MEMBER:
		console.log('ADDMEMBER', state)
			return {
				...state,
				createTeam: {
					...state.createTeam, values: {
						...state.createTeam.values,
						teamMembers: state.createTeam.values.teamMembers.concat(action.payload)
					}
				}
			}
		default:
	    	return state;
	}
}