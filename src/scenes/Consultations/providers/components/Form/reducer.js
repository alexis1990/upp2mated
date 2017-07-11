import initialState from './initialState'
import * as types from './actionTypes'
import {reducer as formReducer} from 'redux-form';
import _ from 'lodash'

const newField = {};

export function providersReducer(state = initialState, action = action) {
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
	    default:
	    	return state;
	}	
}