import initialState from './initialState'
import * as types from './actionTypes'
import {reducer as formReducer} from 'redux-form';
import _ from 'lodash'

const newField = {};

export function teamReducer(state = initialState, action = action) {
	switch(action.type) {
	    case types.ADD_TEAM_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              teamReducer: state.values.teamReducer.concat(newField)
	            }
	        }
	    case types.REMOVE_TEAM_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              teamReducer: state.values.teamReducer.filter((item, key )=> key !== action.payload)
	            }
	        }
	    case types.ADD_TECH_FIELD:
	      	return { 
	      		...state,
	            values: {
	              ...state.values,
	              techReducer: state.values.techReducer.concat(newField)
	            }  
		    }
	    case types.REMOVE_TECH_FIELD:
	        return { 
	      		...state,
	            values: {
	              ...state.values,
	              techReducer: state.values.techReducer.filter((item, key )=> key !== action.payload)
	            }  
		    }
	    default:
	      	return state;
	}	
}