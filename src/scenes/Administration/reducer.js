import initialState from './initialState'
import * as types from './actionTypes'

export function administationReducer(state= initialState, action= action) {
	switch(action.type) {
		case types.LOAD_TEAMS:
			return { ...state, teams: action.payload}
		case types.LOAD_TEAM:
			return { ...state, team: action.payload}
		case types.LOAD_USERS:
			return { ...state, users: action.payload}
		case types.ADD_MEMBER:
			return {
				...state,
				createTeam: {
					...state.createTeam, values: {
						...state.createTeam.values,
						teamMembers: state.createTeam.values.teamMembers.concat(action.payload)
					}
				}
			}
		case types.REMOVE_MEMBER:
			return {
				...state,
				createTeam: {
					...state.createTeam, values: {
						...state.createTeam.values,
						teamMembers: state.createTeam.values.teamMembers.filter((x) => x.id !== action.payload.id)
					}
				}
			}
		default:
	    	return state;
	}
}