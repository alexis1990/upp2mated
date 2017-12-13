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

export function loadQualitySurvey(qq){
	return {
		type: types.LOAD_QUALITY_SURVEY_REPLY,
		payload: qq
	}
}

export function getQualitySurvey(supplierId, templateId) {
	return (dispatch) => {
		axios.get(`/u2m-api/v1/suppliers/qualityquestionnaire/${templateId}/supplierid/${supplierId}`)
			.then(function (qq) {
				dispatch(loadQualitySurvey(qq))
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function getQualitySurveyHash(supplierId, contactId, qqId) {
	return (dispatch) => {
		axios.post(`/u2m-api/v1/supplier-action/qq?supplierId=${supplierId}&contactId=${contactId}&qqId=${qqId}`)
		.then(({id}) => {
			return axios.get(`/u2m-api/v1/supplier/token/${id}`);
		})
		.then(({hash}) => {
			return axios.get(`/auth/supplier/${hash}`);
		})
		.then(({token}) => {
			localStorage.setItem('token', token);
		})
		.catch((rej) => console.log('ACTIONSSS', rej) )
	}
}
