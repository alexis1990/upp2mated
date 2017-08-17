import * as types from './actionTypes'
import axios from '../../../axios.config'

export function addNewProvider(newProvider) {
	return {
		type: types.ADD_NEW_PROVIDER,
		payload: newProvider
	}
}

export function addProvidersField() {
	const newField = {};
	return {
		type: types.ADD_PROVIDERS_FIELD,
		payload: newField
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

function loadContactsSuccess(isLoading, contact) {
	return {
		type: types.LOAD_SUPPLIER,
		payload: { supplier : contact, isLoading: isLoading }
	}
}

function loadContactsError(isLoading, contact) {
	return {
		type: types.LOAD_SUPPLIER,
		payload: { supplier : contact, isLoading: isLoading }
	}
}

export function loadContacts(contact){
	console.log('IM ALIVE')
	if(contact[0] && contact[0].id) {
		return (dispatch) => {
			axios.get(`/u2m-api/v1/suppliers/${contact[0].id}`)
			.then(function (response) {
				console.log('okokokokokokkokkok', response)
				dispatch(loadContactsSuccess(false, response))
			})
			.catch(function (error) {
				console.log('ERRORloadSupplier',error);
			});
		}
	}
		console.log('IM ALIVE')
	return (dispatch) => {
		dispatch(loadContactsError(false, { contactPersonList: [] }))
	}
}
