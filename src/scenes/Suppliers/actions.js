import * as types from './actionTypes'
import axios from '../../axios.config'

export function loadSuppliers(){
	return (dispatch) => {
		axios.get('/u2m-api/v1/suppliers/')
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
}

export function postSupplier(supplier){
	return (dispatch) => {
		axios.post('/u2m-api/v1/suppliers/', supplier)
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
}