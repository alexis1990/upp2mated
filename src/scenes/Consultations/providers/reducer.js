import initialState from './initialState'
import * as types from './actionTypes'
const newField = {};

export function providersReducer(state = initialState, action = action) {
			console.log('ACTTTTION', action.type)
	switch(action.type) {
		case types.ADD_PROVIDERS_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              providersReducer: state.values.providersReducer.concat(newField)
	            }
	        }
	    case types.REMOVE_PROVIDERS_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              providersReducer: state.values.providersReducer.filter((item, key )=> key !== action.payload)
	            }
	        }
	    case types.ADD_NEW_PROVIDER:
	      	return {
	      		...state,
	            values: {
	              ...state.values,
	              listProviders: state.values.listProviders.concat(action.payload)
	            }
	      	}
	    default:
	    	return state;
	}	
}