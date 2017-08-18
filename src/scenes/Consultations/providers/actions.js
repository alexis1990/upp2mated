import * as types from './actionTypes'
import axios from '../../../axios.config'

export function addNewProvider(newProvider) {
	return {
		type: types.ADD_NEW_PROVIDER,
		payload: newProvider
	}
}

export function addProvidersField() {
	return {
		type: types.ADD_PROVIDERS_FIELD
	}
}

export function removeProvidersField(index) {
	return {
		type: types.REMOVE_PROVIDERS_FIELD,
		payload: index
	}
}


function loadSuppliersSuccess( isLoading, contact) {
	console.log('ACCC', contact)
	return {
		type: types.LOAD_SUPPLIERS,
		payload:  { suppliers : contact, isLoading: isLoading }
	}
}

export function loadSuppliers(){
	return (dispatch) => {
		axios.get(`/u2m-api/v1/suppliers/`)
		.then(function (response) {
			dispatch(loadSuppliersSuccess(false, response))
		})
		.catch(function (error) {
			console.log('ERRORloadSuppliers', error);
		});
	}
}

export function loadContacts(values) {
	console.log('VALUES', values)
	return {
		type: types.LOAD_CONTACTS
	}
}

export function postSuppliersChoices(suppliersInfo) {

	const consultationSupplierList = {
		...suppliersInfo,
		consultationSupplierList : suppliersInfo.consultationSupplierList.map((supplierInfo, index) => {
			return {
				...suppliersInfo.consultationSupplierList[index],
				supplier: suppliersInfo.consultationSupplierList[index].supplier[0].id,
				interlocutor: suppliersInfo.consultationSupplierList[index].interlocutor[0].id
			}
		})
	}

	console.log('SUPPPPPPP', consultationSupplierList);
	return (dispatch) => {
		const consultationId = sessionStorage.getItem('consultationId');
		axios.post(`/u2m-api/v1/consultation/${consultationId}/step4`, consultationSupplierList)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}
