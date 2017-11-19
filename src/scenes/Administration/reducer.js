import initialState from './initialState'
import * as types from './actionTypes'

export function administationReducer(state = initialState, action = action) {
	let type = '';

	switch (action.type) {
		case types.LOAD_TEAMS:
			return { ...state, teams: action.payload }
		case types.LOAD_TEAM:
			return {
				...state,
				team: action.payload,
				editTeam: {
					...state.editTeam,
					values: {
						...state.editTeam.values,
						id: action.payload.data.id,
						name: action.payload.data.name,
						teamMembers: action.payload.data.teamMembers
					},
					isLoading: action.payload.isLoading
				}
			}
		case types.LOAD_USERS:
			return { ...state, users: action.payload }
		case types.LOAD_USER:
			return { ...state, user: action.payload }
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
		case types.ADD_TEAM_CREATION:
			console.log('action.payload', action.payload)
			return {
				...state,
				createUser: {
					...state.createUser, values: {
						...state.createUser.values,
						teamList: state.createUser.values.teamList.concat(action.payload)
					}
				}
			}
		case types.REMOVE_TEAM_CREATION:
			return {
				...state,
				createUser: {
					...state.createUser, values: {
						...state.createUser.values,
						teamList: state.createUser.values.teamList.filter((x) => x.id !== action.payload.id)
					}
				}
			}
		case types.LOAD_RESPONSIBILITIES:
			return {
				...state, authorization: {
					...state.authorization, responsibilities: action.payload
				}
			}
		case types.LOAD_SCOPES:
			return {
				...state, authorization: {
					...state.authorization, scopes: action.payload
				}
			}
		case types.LOAD_ROLES:
			return {
				...state, authorization: {
					...state.authorization, roles: action.payload
				}
			}
		case types.LOAD_ROLE:
		
			return {
				...state, manageRoles: {
					...state.authorization.manageRoles, values: action.payload
				}
			}
		case types.ADD_TEAM_AUHORIZATION_LIST:
			type = action.payload.type;
			console.log('ACTIPN', action.payload)
			return {
				...state,
				authorization: {
					...state.authorization, [type]: {
						...state.authorization[type],
						teams: state.authorization[type].teams.concat({ team: { values: action.payload } })
					}
				}
			}
		case types.REMOVE_TEAM_AUHORIZATION_LIST:
			type = action.payload.type;
			return {
				...state,
				authorization: {
					...state.authorization, [type]: {
						...state.authorization[type],
						teams: state.authorization[type].teams.filter((x) => x.team.values.id !== action.payload.id)
					}
				}
			}
		case types.ADD_USER_AUHORIZATION_LIST:
			type = action.payload.type;
			return {
				...state,
				authorization: {
					...state.authorization, [type]: {
						...state.authorization[type],
						users: state.authorization[type].users.concat({ user: { values: action.payload } })
					}
				}
			}
		case types.REMOVE_USER_AUHORIZATION_LIST:
			type = action.payload.type;
			return {
				...state,
				authorization: {
					...state.authorization, [type]: {
						...state.authorization[type],
						users: state.authorization[type].users.filter((x) => x.user.values.id !== action.payload.id)
					}
				}
			}
		case types.RESET_AUHORIZATION_LIST:
			return {
				...state,
				authorization: {
					...state.authorization, tenant: {
						...state.authorization.tenant,
						role: {},
						users: [],
						teams: []
					}
				}
			}
		case types.LOAD_QUALITY_SURVEYS:
			return {
				...state,
				qualitySurveys: { 
					...state.qualitySurveys, values : action.payload
				}
			}
		case types.LOAD_QUALITY_SURVEY:
			return {
				...state,
				qualitySurvey: {
					...state.qualitySurvey, values: {
						...state.qualitySurvey.values,
						sections: action.payload 
					}
				}
			}
		case types.ADD_CHANGE_SET_SECTION:
			return {
				...state,
				qualitySurvey: {
					...state.qualitySurvey, values: {
						...state.qualitySurvey.values, 
						changeList: state.qualitySurvey.values.changeList.concat(action.payload)
					}
				}
			}
		case types.ADD_CHANGE_SET_QUESTION:
			return {
				...state,
				qualitySurvey: {
					...state.qualitySurvey, values: {
						...state.qualitySurvey.values, 
						changeList: state.qualitySurvey.values.changeList.concat(action.payload)
					}
				}
			}
		default:
			return state;
	}
}