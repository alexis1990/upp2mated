import axios from '../../../axios.config'

export function submitFormToAPI(values) {
  		console.log('kokokokokookook')
  		const step1 = axios.post('u2m-api/v1/consultation/step1', values)
  		return (dispatch) =>(
			step1.then(function (response) {
				console.log('RESSSPPPP', response);
			})
			.catch(function (error) {
				console.log('ERRRR', error);
			})
  		)
}