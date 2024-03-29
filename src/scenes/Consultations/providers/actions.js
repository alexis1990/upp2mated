import * as types from './actionTypes'
import { change } from 'redux-form'
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

export function postSuppliersChoices(suppliersInfo) {
	const consultationSupplierList = {
		...suppliersInfo,
		consultationSupplierList : suppliersInfo.consultationSupplierList.map((supplierInfo, index) => {
			const interlocutorValue = suppliersInfo.consultationSupplierList[index].interlocutor;
			console.log('INTEEE', interlocutorValue)
			return {
				...suppliersInfo.consultationSupplierList[index],
				supplier: suppliersInfo.consultationSupplierList[index].supplier[0].id,
				interlocutor: interlocutorValue[0].id
			}
		})
	}

	return (dispatch) => {
		console.log('INTEEE', consultationSupplierList)
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
