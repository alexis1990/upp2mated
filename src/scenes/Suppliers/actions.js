import * as types from './actionTypes'
import axios from '../../axios.config'

function isLoadingData( isLoading, contact) {
	console.log('ACCC', contact)
	return {
		type: types.IS_LOADING_SUPPLIER,
		payload:  { isLoading: isLoading }
	}
}

function loadUsers( isLoading, contact) {
	console.log('ACCC', contact)
	return {
		type: types.LOAD_SUPPLIERS,
		payload:  { suppliers : contact, isLoading: isLoading }
	}
}

function loadUser(isLoading, contact) {
	console.log('ACCC', contact)
	return {
		type: types.LOAD_SUPPLIER,
		payload: { supplier : contact, isLoading: isLoading }
	}
}

export function loadSuppliers(pageId){
	return (dispatch) => {
		axios.get(`/u2m-api/v1/suppliers/?page=${pageId}`)
		.then(function (response) {
			dispatch(loadUsers(false, response))
		})
		.catch(function (error) {
			console.log('ERRORloadSuppliers', error);
		});
	}
}

export function loadSupplier(id){
	return (dispatch) => {
		dispatch(isLoadingData(true))
		axios.get(`/u2m-api/v1/suppliers/${id}`)
		.then(function (response) {
			dispatch(loadUser(false, response))
		})
		.catch(function (error) {
			console.log('ERRORloadSupplier',error);
		});
	}
}

export function postSupplier(supplier){
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
