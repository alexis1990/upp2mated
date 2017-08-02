import initialState from './initialState'
import * as types from './actionTypes'

export function wizardReducer(state = initialState.wizard, action = action) {
          // console.log('OKOKOOKOK', action.payload)
	switch(action.type) {
			case types.NEXT_PAGE:
        console.log('OKOKOOKOK', action.payload)
	    	return {
          actualStep: parseInt(action.payload) + 1
        }
	    default:
      	return state;
	}
}
