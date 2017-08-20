import initialState from './initialState'
import * as types from './actionTypes'

export function suppliersReducer(state = initialState, action = action) {
	switch(action.type) {
		case types.LOAD_SUPPLIERS:
	      	return {
							...state,
            	suppliers: action.payload.suppliers, supplier: { contactPersonList : [] }, isLoading: action.payload.isLoading
          }
      	case types.LOAD_SUPPLIER:
					console.log('ACTUALSTATE', state)
	        return {
	          	...state,
	          	supplier: action.payload.supplier, suppliers: { ...state.suppliers }, isLoading: action.payload.isLoading
	        }
      	case types.IS_LOADING_SUPPLIER:
	        return {
	          	...state, isLoading: action.payload.isLoading
	        }
	    default:
	    	return state;
	}
}
