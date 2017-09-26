import initialState from './initialState'
import * as types from './actionTypes'

export function administationReducer(state= initialState, action= action) {
	switch(action.type) {
		case types.LOAD_TEAMS:
			return { ...state, teams: action.payload}
		case types.LOAD_TEAM:
			console.log('LOADTEAM', action.payload)
			return { ...state, 
				team: action.payload,
				editTeam: {
					...state.editTeam, 
					values: { 
						...state.editTeam.values,
						id: action.payload.data.id,
						name: action.payload.data.name,
						teamMembers : action.payload.data.teamMembers
					},
					isLoading: action.payload.isLoading
				}
			}
		case types.LOAD_USERS:
			return { ...state, users: action.payload}
		case types.LOAD_USER:
			return { ...state, user: action.payload}
		case types.ADD_MEMBER_CREATION:
			return {
				...state,
				createTeam: {
					...state.createTeam, values: {
						...state.createTeam.values,
						teamMembers: state.createTeam.values.teamMembers.concat(action.payload)
					}
				}
			}
		case types.REMOVE_MEMBER_CREATION:
			return {
				...state,
				createTeam: {
					...state.createTeam, values: {
						...state.createTeam.values,
						teamMembers: state.createTeam.values.teamMembers.filter((x) => x.id !== action.payload.id)
					}
				}
			}
		case types.ADD_MEMBER_EDITION:
			return {
				...state,
				editTeam: {
					...state.editTeam, values: {
						...state.editTeam.values,
						teamMembers: state.editTeam.values.teamMembers.concat(action.payload)
					}
				}
			}
		case types.REMOVE_MEMBER_EDITION:
			return {
				...state,
				editTeam: {
					...state.editTeam, values: {
						...state.editTeam.values,
						teamMembers: state.editTeam.values.teamMembers.filter((x) => x.id !== action.payload.id)
					}
				}
			}		
		default:
	    	return state;
	}
}