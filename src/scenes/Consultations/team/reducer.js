import initialState from './initialState'
import * as types from './actionTypes'

export function teamReducer(state = initialState, action = action) {
	switch(action.type) {
	    case types.ADD_TEAM_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              commercial: state.values.commercial.concat(state.values.tech)
	            }
	        }
	    case types.REMOVE_TEAM_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              commercial: state.values.commercial.filter((item, key )=> key !== action.payload)
	            }
	        }
	    case types.ADD_TECH_FIELD:
	      	return {
	      		...state,
	            values: {
	              ...state.values,
	              tech: state.values.tech.concat(state.values.tech)
	            }
		    }
	    case types.REMOVE_TECH_FIELD:
	        return {
	      		...state,
	            values: {
	              ...state.values,
	              tech: state.values.tech.filter((item, key )=> key !== action.payload)
	            }
		    }
			case types.LOAD_TEAM_USERS:
				return {
					...state,
					teamUsers: action.payload
				}
	    	default:
	      		return state;
	}
}
