import axios from 'axios'

export function getQualitySurveyHash(supplierId, contactId, qqId) {
	return (dispatch) => {
		axios.post(`/u2m-api/v1/supplier-action/qq?supplierId=${supplierId}&contactId=50&qqId=${qqId}`)
		.then(({id}) => {
			return axios.get(`/u2m-api/v1/supplier/token/${id}`);
		})
		.then(({hash}) => {
			return axios.get(`/auth/supplier/${hash}`);
		})
		.then(({token}) => {
			localStorage.setItem('token', token);
		})
		.catch((rej) => console.log('ERROR', rej) )
	}
}