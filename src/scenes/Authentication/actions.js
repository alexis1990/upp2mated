import axios from 'axios'
import * as types from './actionTypes'

var instance = axios.create({
  baseURL: 'https://upp2mated-backend.herokuapp.com/',
  // timeout: 1000,
  // headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});

export function authenticate(identifiers, history) {
	return (dispatch) => {
		dispatch(authentication(false))
		instance.post('auth/login', {
		    login: identifiers.username,
		    password: identifiers.password
		})
		.then(function (response) {
			sessionStorage.setItem('token', response.data.token);
			dispatch(authenticationSuccess(response))
			history.push('/consultations/1')
		})
		.catch(function (error) {
			console.log('ERRORRR', error)
			dispatch(authentication(null))
		});
	}
}

export function authentication(isLogged) {
	return {
		type: types.AUTHENTICATION,
		payload: { isLogged: isLogged }
	}
}

export function authenticationSuccess(response) {
	return {
		type: types.IS_AUTHENTICATED,
		payload: { token: response.data.token, isLogged: true }
	}
}