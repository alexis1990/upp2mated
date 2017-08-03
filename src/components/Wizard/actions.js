import * as types from './actionTypes'
import axios from 'axios'


var instance = axios.create({
  baseURL: 'https://upp2mated-backend.herokuapp.com//u2m-api/v1',
  // timeout: 1000,
  // headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});


export function nextPage(id) {
  console.log('IIIIIKKKKK', id)
  return {
		type: types.NEXT_PAGE,
		payload: id
	}
}

export function submitFormToAPI(values) {
  	return (dispatch) => {
  		instance.post('/consultation/step1', values)
		.then(function (response) {
			console.log('RESSSPPPP', response);
		})
		.catch(function (error) {
			console.log('ERRRR', error);
		});
	}
}
