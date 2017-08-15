import axios from '../../../axios.config'

export function submitFormToAPI(values, nextPage, history, stepId) {
  		console.log('kokokokokookook')
		values.endDate =  "2017-08-06T22:40:51.802Z";
  		const step1 = axios.post('u2m-api/v1/consultation/step1', values)
  		return (dispatch) =>(
			step1.then(function (response) {
				console.log('RESSSPPPP', response);
				sessionStorage.setItem('consultationId', response.id)
				// navigateToNextStep();
				nextPage(history, '/consultations/', stepId)
			})
			.catch(function (error) {
				console.log('ERRRR', error);
			})
  		)
}