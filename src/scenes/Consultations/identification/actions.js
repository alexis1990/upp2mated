import axios from '../../../axios.config'
import moment from 'moment'

export function submitFormToAPI(identificationValues, nextPage, history, stepId) {
	const formatDate = (identificationValues) => {
		return {
			...identificationValues,  
			endDate: moment(identificationValues.date.endDate).toISOString(), 
			startDate: moment(identificationValues.date.endDate).toISOString()
		}
	}

	if (!identificationValues.date) return { type: ''};
	const step1 = axios.post('u2m-api/v1/consultation/step1', formatDate(identificationValues))
	return (dispatch) =>(
		step1.then(function (response) {
			sessionStorage.setItem('consultationId', response.id)
			nextPage(history, '/consultations/', stepId)
		})
		.catch(function (error) {
			console.log('ERRRR', error);
		})
	)
}