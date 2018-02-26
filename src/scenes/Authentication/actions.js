import axios from 'axios';
import * as types from './actionTypes';

var jwtDecode = require('jwt-decode');

var instance = axios.create({
  baseURL: 'http://localhost:8080/',
  // timeout: 1000,
  // headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});

export function authentication(isLogged) {
  return {
    type: types.AUTHENTICATION,
    payload: { isLogged },
  };
}

export function authenticationSuccess(response) {
  return {
    type: types.IS_AUTHENTICATED,
    payload: { token: response.data.token, isLogged: true },
  };
}

export function authenticateSupplierWithoutCredential(hash) {
  console.log("coucou je rentre là");
  const saveInfosInSessionStorage = (response) => {
    const token = response.data.token;
    const decodedToken = jwtDecode(token);

    console.log(response);
    console.log(decodedToken);
  };

  console.log("j'arrive là");

  return (dispatch) => {
    console.log("j'arrive là aussi");
    dispatch(authentication(false));
    console.log("j'arrive là aussi meh");
    return instance.get(`auth/supplier/${hash}`)
      .then((response) => {
        saveInfosInSessionStorage(response);
        dispatch(authenticationSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        console.log('ERRORRR', error);
        dispatch(authentication(null));
      });
  };
}

export function authenticate(identifiers, history) {

  const saveInfosInSessionStorage = (response) => {
    const token = response.data.token;
    const decodedToken = jwtDecode(token);
    const person = JSON.stringify(decodedToken.person);
    const teamId = JSON.stringify(decodedToken.teamId);
    const roles = JSON.stringify(decodedToken.roles);

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('person', person);
    sessionStorage.setItem('teamId', teamId);
    sessionStorage.setItem('roles', roles);
  };

  return (dispatch) => {
    dispatch(authentication(false));
    instance.post('auth/login', {
      login: identifiers.username,
      password: identifiers.password,
    })
      .then(function (response) {
        saveInfosInSessionStorage(response);
        dispatch(authenticationSuccess(response));
        history.push('/dashboard');
      })
      .catch(function (error) {
        console.log('ERRORRR', error);
        dispatch(authentication(null));
      });
  };
}
