import * as types from './actionTypes'
import axios from '../../axios.config'
import _ from 'lodash'

function loadSuppliers(isLoading, contact) {
	return {
		type: types.LOAD_SUPPLIERS,
		payload: { suppliers: contact, isLoading: isLoading }
	}
}

function loadSupplier(isLoading, contact) {
	return {
		type: types.LOAD_SUPPLIER,
		payload: { supplier: contact, isLoading: isLoading }
	}
}

export function fetchSuppliers(pageId) {
	
	return (dispatch) => {
		dispatch(loadSuppliers(true, {content: []}))
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

export function loadQualitySurvey(qualitySurvey){
	return {
		type: types.LOAD_QUALITY_SURVEY_REPLY,
		payload: qualitySurvey
	}
}

export function getQualitySurvey(supplierId, templateId) {
	console.log('supplierId, templateId', supplierId, templateId)
	return (dispatch) => {
		axios.get(`/u2m-api/v1/suppliers/qualityquestionnaire/${templateId}/supplierid/${supplierId}`)
			.then((qq) => {
				const qualitySurvey = qq;
				return axios.get(`u2m-api/v1/suppliers/template/qualityquestionnaire/${templateId}`)
				.then((template) => {
					return _.merge(qualitySurvey, template)
				})
			}).then((qualitySurvey) => {
				dispatch(loadQualitySurvey(qualitySurvey))
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function sendReply(qualitySurvey, templateId, supplierId) {

	const answersList = {
		answers :  _.chain(qualitySurvey.content)
		.map('questions')
		.flatten()
		.reduce((arr, question) => { 
			return arr.concat(question.answers.map((answer) =>  { 
				return {
					answer: answer.content,
					questionId: question.questionId
				}
			}))
		}, [])
		.value(),
		supplierId: parseInt(supplierId),
		templateId: parseInt(templateId),
		templateIdVersion: 1,
	}

	return (dispatch) => {
		axios.post('/u2m-api/v1/suppliers/qualityquestionnaire/', answersList)
		.then((response) => console.log('REPLYYYYYYYYYYY'))
		.catch((error)=> console.log('ERRRRRRRRRRRRRRR'))
	}
}

export function deleteSupplier(supplierId) {
	return (dispatch) => {
		axios.delete(`/u2m-api/v1/suppliers/${supplierId}?supplierId=${supplierId}`)
		.then((resolve) => {
			dispatch({
				type: types.REMOVE_SUPPLIER,
				payload: supplierId
			})
		})
		.catch((reject)=> console.log('REJJ'))
	}
}

export function getFinancialHealth(supplierId) {
	return(dispatch) => {
		axios.get(`/u2m-api/v1/suppliers/${supplierId}/financial-health/`)
		.then((resolve) => {
			console.log('RESOLVEEE', resolve)
		})
		.catch((reject)=> console.log('REJJ'))
	}
}