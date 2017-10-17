import initialState from './initialState'
import * as types from './actionTypes'

export function suppliersReducer(state = initialState, action = action) {
	console.log('SUPPLIERREDUCE', state)
	switch (action.type) {
		case types.LOAD_SUPPLIERS:
			return {
				...state,
				suppliers: action.payload.suppliers,
				isLoading: action.payload.isLoading
			}
		case types.LOAD_SUPPLIER:
			return {
				...state,
				supplier: action.payload.supplier,
				ManageSupplier: {
					...state.ManageSupplier,
					values: action.payload.supplier
				},
				isLoading: action.payload.isLoading
			}
		default:
			return state;
	}
}
