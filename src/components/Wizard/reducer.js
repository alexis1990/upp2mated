import initialState from './initialState'
import * as types from './actionTypes'

export function wizardReducer(state = initialState.wizard, action = action) {
	switch(action.type) {
		case types.NEXT_PAGE:
	    	return {
          actualStep: parseInt(action.payload) + 1
        };
	    default:
      	return state;
	}
}
