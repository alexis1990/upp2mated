import initialState from './initialState'
import * as types from './actionTypes'
const newField = {};

export function providersReducer(state = initialState, action = action) {
	switch(action.type) {
		case types.ADD_PROVIDERS_FIELD:
		return {
			...state,
			values: {
				...state.values,
				consultationSupplierList: [...state.values.consultationSupplierList, {
					supplier: [{
						contactPersonList: []
					}],
					interlocutor: {
						id: '',
						name: ''
					},
					referenceCustomerRequested: false,
					qualitySecurityServey: false,
					supplierPresence: false,
				}]
			}
		};
		case types.REMOVE_PROVIDERS_FIELD:
		return {
			...state,
			values: {
				...state.values,
				consultationSupplierList: state.values.consultationSupplierList.filter((item, key )=> key !== action.payload)
			}
		};
		case types.ADD_NEW_PROVIDER:
		return {
			...state,
			values: {
				...state.values,
				listProviders: state.values.listProviders.concat(action.payload)
			}
		};
		default:
		return state;
	}
}
