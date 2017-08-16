import initialState from './initialState'
import * as types from './actionTypes'

export function suppliersReducer(state = initialState, action = action) {
	switch(action.type) {
		  case types.LOAD_SUPPLIERS:
      console.log('OKOKOK1')
	      	return {
            suppliers: action.payload.suppliers, isLoading: action.payload.isLoading
          }
      case types.LOAD_SUPPLIER:
      console.log('OKOKOK2')
        return {
          ...state,
          supplier: action.payload.supplier, isLoading: action.payload.isLoading
        }
      case types.IS_LOADING_SUPPLIER:
      console.log('OKOKOK3')
        return {
          ...state, isLoading: action.payload.isLoading
        }
	    default:
	    	return state;
	}
}
