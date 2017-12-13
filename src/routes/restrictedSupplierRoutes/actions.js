import axios from 'axios'

export function getQualitySurveyHash(supplierId, contactId, qqId) {
	return (dispatch) => {
		axios.post(`/u2m-api/v1/supplier-action/qq?supplierId=${supplierId}&contactId=${contactId}&qqId=${qqId}`)
		.then(({id}) => {
			console.log('ACTIONSSS', id) 
			return axios.get(`/u2m-api/v1/supplier/token/${id}`);
		})
		.then(({hash}) => {
			console.log('QQQQ', hash)
			return axios.get(`/auth/supplier/${hash}`);
		})
		.then(({token}) => {
			localStorage.setItem('token', token);
		})
		.catch((rej) => console.log('ERROR', rej) )
	}
}