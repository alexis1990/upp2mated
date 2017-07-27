import initialState from './initialState'
import * as types from './actionTypes'

export function auth(state = initialState, action = action) {
	switch(action.type) {
		case types.AUTHENTICATION:
	    	return {
              	isLogged: action.payload.isLogged,
	        }
	    case types.IS_AUTHENTICATED:
	    	return {
              	isLogged: action.payload.isLogged,
              	token: action.payload.token
	        }
	    default:
      		return state;
	}
}