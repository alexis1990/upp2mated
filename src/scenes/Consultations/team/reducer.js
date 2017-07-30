import initialState from './initialState'
import * as types from './actionTypes'

const newField = {};

export function teamReducer(state = initialState, action = action) {
	switch(action.type) {
	    case types.ADD_TEAM_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              team: state.values.team.concat(newField)
	            }
	        }
	    case types.REMOVE_TEAM_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              team: state.values.team.filter((item, key )=> key !== action.payload)
	            }
	        }
	    case types.ADD_TECH_FIELD:
	      	return { 
	      		...state,
	            values: {
	              ...state.values,
	              tech: state.values.tech.concat(newField)
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
	    default:
	      	return state;
	}	
}