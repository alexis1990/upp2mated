import initialState from './initialState'
import * as types from './actionTypes'
const newField = {};

export function identificationReducer(state = initialState, action = action) {
	switch(action.type) {
		case types.LOAD_IDENTIFICATION_DATA:
	      	return {
	            ...state,
	            values: {
	              ...state.values
	            }
	        }
	    default:
	    	return state;
	}	
}