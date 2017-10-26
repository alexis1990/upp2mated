import * as types from './actionTypes'
import axios from '../../axios.config'

function loadSuppliers(isLoading, contact) {
	console.log('ACCC', contact)
	return {
		type: types.LOAD_SUPPLIERS,
		payload: { suppliers: contact, isLoading: isLoading }
	}
}

function loadSupplier(isLoading, contact) {
	console.log('ACCC', contact)
	return {
		type: types.LOAD_SUPPLIER,
		payload: { supplier: contact, isLoading: isLoading }
	}
}

export function fetchSuppliers(pageId) {
	return (dispatch) => {
		axios.get(`/u2m-api/v1/suppliers/?page=${pageId}`)
			.then(function (response) {
				dispatch(loadSuppliers(false, response))
			})
			.catch(function (error) {
				console.log('ERRORloadSuppliers', error);
			});
	}
}

export function fetchSupplier(id) {
	return (dispatch) => {
		dispatch(loadSupplier(true, { contactPersonList: [] }))
		axios.get(`/u2m-api/v1/suppliers/${id}`)
			.then(function (response) {
				dispatch(loadSupplier(false, response))
			})
			.catch(function (error) {
				console.log('ERRORloadSupplier', error);
			});
	}
}

export function postSupplier(supplier) {
	return (dispatch) => {
		axios.post('/u2m-api/v1/suppliers/', supplier)
			.then(function (response) {
				console.log('POSTRESULT', response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}
