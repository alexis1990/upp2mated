import initialState from './initialState'
import * as types from './actionTypes'

export function suppliersReducer(state = initialState, action = action) {
	switch(action.type) {
		case types.LOAD_SUPPLIERS:
	      	return {
            	suppliers: action.payload.suppliers, isLoading: action.payload.isLoading
          	}
      	case types.LOAD_SUPPLIER:
	        return {
	          	...state,
	          	supplier: action.payload.supplier, isLoading: action.payload.isLoading
	        }
      	case types.IS_LOADING_SUPPLIER:
	        return {
	          	...state, isLoading: action.payload.isLoading
	        }
	    default:
	    	return state;
	}
}
