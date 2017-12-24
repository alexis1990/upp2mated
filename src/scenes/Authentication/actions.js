import axios from 'axios'
import * as types from './actionTypes'
var jwtDecode = require('jwt-decode');

var instance = axios.create({
  baseURL: 'https://upp2mated-backend.herokuapp.com/',
  // timeout: 1000,
  // headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});

export function authenticate(identifiers, history) {
	
	const saveInfosInSessionStorage = (response) => {
		const token = response.data.token;
		const decodedToken = jwtDecode(token);
		const person = JSON.stringify(decodedToken.person);
		const roles = JSON.stringify(decodedToken.roles);

		sessionStorage.setItem('token', token);
		sessionStorage.setItem('person', person);
		sessionStorage.setItem('roles', roles);
	}

	return (dispatch) => {
		dispatch(authentication(false))
		instance.post('auth/login', {
		    login: identifiers.username,
		    password: identifiers.password
		})
		.then(function (response) {
			saveInfosInSessionStorage(response)
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